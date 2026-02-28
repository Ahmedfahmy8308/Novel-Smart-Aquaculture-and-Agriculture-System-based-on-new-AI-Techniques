class ChatMessageEntity {
  final String id;
  final String conversationId;
  final String content;
  final String sender;
  final DateTime timestamp;
  final String? messageType;
  final Map<String, dynamic>? metadata;
  final bool isProcessing;

  const ChatMessageEntity({
    required this.id,
    required this.conversationId,
    required this.content,
    required this.sender,
    required this.timestamp,
    this.messageType,
    this.metadata,
    this.isProcessing = false,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is ChatMessageEntity &&
        other.id == id &&
        other.conversationId == conversationId &&
        other.timestamp == timestamp;
  }

  @override
  int get hashCode {
    return Object.hash(id, conversationId, timestamp);
  }

  @override
  String toString() {
    return 'ChatMessageEntity(id: $id, sender: $sender, content: ${content.length > 50 ? '${content.substring(0, 50)}...' : content})';
  }

  bool get isFromUser => sender == 'user';
  bool get isFromAssistant => sender == 'assistant';
}
