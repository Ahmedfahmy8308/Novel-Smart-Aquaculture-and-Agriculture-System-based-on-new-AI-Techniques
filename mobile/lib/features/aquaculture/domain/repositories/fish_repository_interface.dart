import '../entities/fish_entity.dart';

abstract class FishRepositoryInterface {
  Future<Map<String, dynamic>> detectDisease(String imagePath);
  Future<Map<String, dynamic>> analyzeGrowth(String imagePath);
  Future<Map<String, dynamic>> countFish(String imagePath);
  Future<List<FishEntity>> getFishList();
  Future<FishEntity> getFishById(String id);
}
