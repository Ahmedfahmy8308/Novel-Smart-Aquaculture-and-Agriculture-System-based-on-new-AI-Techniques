class ConversationModel {
  final String id;
  final String title;
  final List<String> messageIds;
  final DateTime createdAt;
  final DateTime updatedAt;
  final Map<String, dynamic> context; // Farm context, user preferences, etc.
  final bool isActive;

  const ConversationModel({
    required this.id,
    required this.title,
    required this.messageIds,
    required this.createdAt,
    required this.updatedAt,
    required this.context,
    this.isActive = true,
  });

  factory ConversationModel.fromJson(Map<String, dynamic> json) {
    return ConversationModel(
      id: json['id'] as String,
      title: json['title'] as String,
      messageIds: List<String>.from(json['message_ids'] as List),
      createdAt: DateTime.parse(json['created_at'] as String),
      updatedAt: DateTime.parse(json['updated_at'] as String),
      context: json['context'] as Map<String, dynamic>,
      isActive: json['is_active'] as bool? ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'message_ids': messageIds,
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
      'context': context,
      'is_active': isActive,
    };
  }

  ConversationModel copyWith({
    String? id,
    String? title,
    List<String>? messageIds,
    DateTime? createdAt,
    DateTime? updatedAt,
    Map<String, dynamic>? context,
    bool? isActive,
  }) {
    return ConversationModel(
      id: id ?? this.id,
      title: title ?? this.title,
      messageIds: messageIds ?? this.messageIds,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      context: context ?? this.context,
      isActive: isActive ?? this.isActive,
    );
  }
}
