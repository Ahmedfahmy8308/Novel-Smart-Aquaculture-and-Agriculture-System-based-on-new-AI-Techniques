import '../entities/chat_message_entity.dart';
import '../entities/conversation_entity.dart';

abstract class ChatRepositoryInterface {
  Future<List<ConversationEntity>> getConversations();
  Future<ConversationEntity> createConversation(
    String title,
    Map<String, dynamic> context,
  );
  Future<ConversationEntity> getConversation(String conversationId);
  Future<List<ChatMessageEntity>> getMessages(String conversationId);
  Future<ChatMessageEntity> sendMessage(
    String conversationId,
    String content, {
    String? messageType,
  });
  Future<ChatMessageEntity> getChatResponse(
    String conversationId,
    String userMessage,
  );
  Future<bool> deleteConversation(String conversationId);
  Future<ConversationEntity> updateConversationTitle(
    String conversationId,
    String title,
  );
}
