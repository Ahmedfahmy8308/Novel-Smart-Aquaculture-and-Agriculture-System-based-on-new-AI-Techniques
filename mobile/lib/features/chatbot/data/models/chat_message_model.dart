class ChatMessageModel {
  final String id;
  final String conversationId;
  final String content;
  final String sender; // user or assistant
  final DateTime timestamp;
  final String? messageType; // text, image, file
  final Map<String, dynamic>? metadata;
  final bool isProcessing;

  const ChatMessageModel({
    required this.id,
    required this.conversationId,
    required this.content,
    required this.sender,
    required this.timestamp,
    this.messageType,
    this.metadata,
    this.isProcessing = false,
  });

  factory ChatMessageModel.fromJson(Map<String, dynamic> json) {
    return ChatMessageModel(
      id: json['id'] as String,
      conversationId: json['conversation_id'] as String,
      content: json['content'] as String,
      sender: json['sender'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
      messageType: json['message_type'] as String?,
      metadata: json['metadata'] as Map<String, dynamic>?,
      isProcessing: json['is_processing'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'conversation_id': conversationId,
      'content': content,
      'sender': sender,
      'timestamp': timestamp.toIso8601String(),
      'message_type': messageType,
      'metadata': metadata,
      'is_processing': isProcessing,
    };
  }

  ChatMessageModel copyWith({
    String? id,
    String? conversationId,
    String? content,
    String? sender,
    DateTime? timestamp,
    String? messageType,
    Map<String, dynamic>? metadata,
    bool? isProcessing,
  }) {
    return ChatMessageModel(
      id: id ?? this.id,
      conversationId: conversationId ?? this.conversationId,
      content: content ?? this.content,
      sender: sender ?? this.sender,
      timestamp: timestamp ?? this.timestamp,
      messageType: messageType ?? this.messageType,
      metadata: metadata ?? this.metadata,
      isProcessing: isProcessing ?? this.isProcessing,
    );
  }
}
