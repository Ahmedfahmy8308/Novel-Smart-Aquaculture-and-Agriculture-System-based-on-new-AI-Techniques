import '../entities/chat_message_entity.dart';
import '../repositories/chat_repository_interface.dart';

class SendChatMessageUseCase {
  final ChatRepositoryInterface _repository;

  const SendChatMessageUseCase(this._repository);

  Future<ChatMessageEntity> execute(
    String conversationId,
    String content,
  ) async {
    if (conversationId.isEmpty) {
      throw ArgumentError('Conversation ID cannot be empty');
    }

    if (content.trim().isEmpty) {
      throw ArgumentError('Message content cannot be empty');
    }

    if (content.length > 4000) {
      throw ArgumentError('Message content is too long (max 4000 characters)');
    }

    try {
      // Send user message first
      final userMessage = await _repository.sendMessage(
        conversationId,
        content,
      );

      // Get AI response
      final aiResponse = await _repository.getChatResponse(
        conversationId,
        content,
      );

      return aiResponse;
    } catch (e) {
      throw Exception('Failed to send chat message: $e');
    }
  }
}
