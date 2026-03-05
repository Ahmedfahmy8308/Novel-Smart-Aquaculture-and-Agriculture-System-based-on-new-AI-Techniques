
import random
import time
from collections import Counter
from pathlib import Path
from typing import List, Tuple

import cv2
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from torch.utils.data import DataLoader, Dataset
from torchvision import models
from collections import Counter


# ------------------ Config (simple) ---------------------------------
DATA_DIR = Path("cls_outputs/img_cache_256")  # use cached resized images if available
OUTPUT_DIR = Path("cls_outputs/shrimp_simple")
IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 15
LR = 3e-4
WEIGHT_DECAY = 1e-4
VAL_SPLIT = 0.15
TEST_SPLIT = 0.15
SEED = 42
# --------------------------------------------------------------------


def set_seed(seed: int = 42) -> None:
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)


def list_images(root: Path) -> Tuple[List[Path], List[int], dict]:
    classes = sorted([d for d in root.iterdir() if d.is_dir()])
    class_to_idx = {c.name: i for i, c in enumerate(classes)}
    idx_to_class = {i: c.name for i, c in enumerate(classes)}
    paths: List[Path] = []
    labels: List[int] = []
    for c in classes:
        for p in c.rglob("*"):
            if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".bmp"}:
                paths.append(p)
                labels.append(class_to_idx[c.name])
    return paths, labels, idx_to_class


class SimpleShrimpDataset(Dataset):
    """Reads images from disk, applies simple transforms and returns tensors."""
    MEAN = np.array([0.485, 0.456, 0.406], dtype=np.float32)
    STD = np.array([0.229, 0.224, 0.225], dtype=np.float32)

    def __init__(self, paths: List[Path], labels: List[int], train: bool = False):
        self.paths = list(paths)
        self.labels = list(labels)
        self.train = train

    def __len__(self):
        return len(self.paths)

    def __getitem__(self, idx: int):
        p = self.paths[idx]
        img = cv2.imread(str(p))
        if img is None:
            # Return a black image if reading fails (keeps code simple)
            img = np.zeros((IMG_SIZE, IMG_SIZE, 3), dtype=np.uint8)
        else:
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img = cv2.resize(img, (IMG_SIZE, IMG_SIZE), interpolation=cv2.INTER_AREA)

        if self.train:
            # Horizontal flip with 50% probability
            if random.random() < 0.5:
                img = cv2.flip(img, 1)

            # Mild additional augmentations (safe for beginners / small GPU)
            # Small random rotation
            if random.random() < 0.3:
                angle = random.uniform(-10, 10)
                (h, w) = img.shape[:2]
                M = cv2.getRotationMatrix2D((w // 2, h // 2), angle, 1.0)
                img = cv2.warpAffine(img, M, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)

            # Brightness / contrast small jitter
            if random.random() < 0.4:
                alpha = random.uniform(0.9, 1.1)  # contrast
                beta = random.uniform(-10, 10)    # brightness shift
                img = np.clip(alpha * img + beta, 0, 255).astype(np.uint8)

            # Occasional small blur
            if random.random() < 0.1:
                k = random.choice([3])
                img = cv2.GaussianBlur(img, (k, k), 0)

        img = img.astype(np.float32) / 255.0
        img = (img - self.MEAN) / self.STD
        tensor = torch.from_numpy(img.transpose(2, 0, 1))
        label = torch.tensor(self.labels[idx], dtype=torch.long)
        return tensor, label


def build_model(num_classes: int, device: torch.device) -> nn.Module:
    # EfficientNet-B0 pretrained
    model = models.efficientnet_b0(weights=models.EfficientNet_B0_Weights.IMAGENET1K_V1)
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(nn.Dropout(p=0.2), nn.Linear(in_features, num_classes))
    return model.to(device)


def train_one_epoch(model, loader, criterion, optimizer, device):
    model.train()
    running_loss = 0.0
    correct = 0
    total = 0
    for imgs, labels in loader:
        imgs = imgs.to(device)
        labels = labels.to(device)
        optimizer.zero_grad()
        outputs = model(imgs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item() * imgs.size(0)
        preds = outputs.argmax(dim=1)
        correct += (preds == labels).sum().item()
        total += labels.size(0)
    return running_loss / total, correct / total


def evaluate(model, loader, criterion, device):
    model.eval()
    running_loss = 0.0
    correct = 0
    total = 0
    with torch.no_grad():
        for imgs, labels in loader:
            imgs = imgs.to(device)
            labels = labels.to(device)
            outputs = model(imgs)
            loss = criterion(outputs, labels)
            running_loss += loss.item() * imgs.size(0)
            preds = outputs.argmax(dim=1)
            correct += (preds == labels).sum().item()
            total += labels.size(0)
    return running_loss / total, correct / total


def main():
    set_seed(SEED)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Device: {device}")

    paths, labels, idx_to_class = list_images(DATA_DIR)
    if len(paths) == 0:
        raise RuntimeError(f"No images found in {DATA_DIR}")
    num_classes = len(set(labels))
    print(f"Found {len(paths)} images across {num_classes} classes")

    # Simple random split (stratify by labels)
    x_temp, x_test, y_temp, y_test = train_test_split(paths, labels, test_size=TEST_SPLIT, random_state=SEED, stratify=labels)
    relative_val = VAL_SPLIT / (1.0 - TEST_SPLIT)
    x_train, x_val, y_train, y_val = train_test_split(x_temp, y_temp, test_size=relative_val, random_state=SEED, stratify=y_temp)
    print(f"Split → Train: {len(x_train)} | Val: {len(x_val)} | Test: {len(x_test)}")

    train_ds = SimpleShrimpDataset(x_train, y_train, train=True)
    val_ds = SimpleShrimpDataset(x_val, y_val, train=False)
    test_ds = SimpleShrimpDataset(x_test, y_test, train=False)

    # num_workers=0 on Windows avoids spawn overhead
    train_loader = DataLoader(train_ds, batch_size=BATCH_SIZE, shuffle=True, num_workers=0, pin_memory=True)
    val_loader = DataLoader(val_ds, batch_size=BATCH_SIZE, shuffle=False, num_workers=0, pin_memory=True)
    test_loader = DataLoader(test_ds, batch_size=BATCH_SIZE, shuffle=False, num_workers=0, pin_memory=True)

    model = build_model(num_classes, device)

    # Compute class weights from training split to help with imbalance
    counts = Counter(y_train)
    total = float(len(y_train))
    class_weights = []
    for i in range(num_classes):
        # weight = total / (num_classes * count) -> higher for rare classes
        cnt = counts.get(i, 0)
        if cnt == 0:
            w = 0.0
        else:
            w = total / (num_classes * cnt)
        class_weights.append(w)
    weight_tensor = torch.tensor(class_weights, dtype=torch.float32).to(device)
    criterion = nn.CrossEntropyLoss(weight=weight_tensor)
    optimizer = optim.Adam(model.parameters(), lr=LR, weight_decay=WEIGHT_DECAY)

    best_val_acc = 0.0
    best_path = OUTPUT_DIR / "best_cls_model.pth"

    for epoch in range(1, EPOCHS + 1):
        t0 = time.time()
        tr_loss, tr_acc = train_one_epoch(model, train_loader, criterion, optimizer, device)
        val_loss, val_acc = evaluate(model, val_loader, criterion, device)
        elapsed = time.time() - t0
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            torch.save(model.state_dict(), best_path)
        print(f"Epoch {epoch}/{EPOCHS} | Train Loss {tr_loss:.4f} Acc {tr_acc*100:.2f}% | Val Loss {val_loss:.4f} Acc {val_acc*100:.2f}% | {int(elapsed)}s")

    print(f"Best val accuracy: {best_val_acc*100:.2f}% (saved to {best_path})")

    # Load best and test
    if best_path.exists():
        model.load_state_dict(torch.load(best_path, map_location=device))
    test_loss, test_acc = evaluate(model, test_loader, criterion, device)
    print(f"Test Loss {test_loss:.4f} Acc {test_acc*100:.2f}%")


if __name__ == "__main__":
    main()
