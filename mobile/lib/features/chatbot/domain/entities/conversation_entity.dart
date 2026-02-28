class ConversationEntity {
  final String id;
  final String title;
  final List<String> messageIds;
  final DateTime createdAt;
  final DateTime updatedAt;
  final Map<String, dynamic> context;
  final bool isActive;

  const ConversationEntity({
    required this.id,
    required this.title,
    required this.messageIds,
    required this.createdAt,
    required this.updatedAt,
    required this.context,
    this.isActive = true,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is ConversationEntity &&
        other.id == id &&
        other.createdAt == createdAt;
  }

  @override
  int get hashCode {
    return Object.hash(id, createdAt);
  }

  @override
  String toString() {
    return 'ConversationEntity(id: $id, title: $title, messages: ${messageIds.length})';
  }

  int get messageCount => messageIds.length;
  bool get isEmpty => messageIds.isEmpty;
}
