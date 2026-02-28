import '../../domain/entities/chat_message_entity.dart';
import '../../domain/entities/conversation_entity.dart';
import '../../domain/repositories/chat_repository_interface.dart';
import '../models/chat_message_model.dart';
import '../models/conversation_model.dart';
import '../../../../services/llm_service_api.dart';

class ChatRepository implements ChatRepositoryInterface {
  final LlmServiceApi _llmService;

  const ChatRepository(this._llmService);

  @override
  Future<List<ConversationEntity>> getConversations() async {
    try {
      final conversations = await _llmService.getConversations();
      return conversations
          .map((model) => _conversationModelToEntity(model))
          .toList();
    } catch (e) {
      throw Exception('Failed to get conversations: $e');
    }
  }

  @override
  Future<ConversationEntity> createConversation(
    String title,
    Map<String, dynamic> context,
  ) async {
    try {
      final conversation = await _llmService.createConversation(title, context);
      return _conversationModelToEntity(conversation);
    } catch (e) {
      throw Exception('Failed to create conversation: $e');
    }
  }

  @override
  Future<ConversationEntity> getConversation(String conversationId) async {
    try {
      final conversation = await _llmService.getConversation(conversationId);
      return _conversationModelToEntity(conversation);
    } catch (e) {
      throw Exception('Failed to get conversation: $e');
    }
  }

  @override
  Future<List<ChatMessageEntity>> getMessages(String conversationId) async {
    try {
      final messages = await _llmService.getMessages(conversationId);
      return messages.map((model) => _chatMessageModelToEntity(model)).toList();
    } catch (e) {
      throw Exception('Failed to get messages: $e');
    }
  }

  @override
  Future<ChatMessageEntity> sendMessage(
    String conversationId,
    String content, {
    String? messageType,
  }) async {
    try {
      final message = await _llmService.sendMessage(
        conversationId,
        content,
        messageType: messageType,
      );
      return _chatMessageModelToEntity(message);
    } catch (e) {
      throw Exception('Failed to send message: $e');
    }
  }

  @override
  Future<ChatMessageEntity> getChatResponse(
    String conversationId,
    String userMessage,
  ) async {
    try {
      final response = await _llmService.getChatResponse(
        conversationId,
        userMessage,
      );
      return _chatMessageModelToEntity(response);
    } catch (e) {
      throw Exception('Failed to get chat response: $e');
    }
  }

  @override
  Future<bool> deleteConversation(String conversationId) async {
    try {
      await _llmService.deleteConversation(conversationId);
      return true;
    } catch (e) {
      throw Exception('Failed to delete conversation: $e');
    }
  }

  @override
  Future<ConversationEntity> updateConversationTitle(
    String conversationId,
    String title,
  ) async {
    try {
      final conversation = await _llmService.updateConversationTitle(
        conversationId,
        title,
      );
      return _conversationModelToEntity(conversation);
    } catch (e) {
      throw Exception('Failed to update conversation title: $e');
    }
  }

  ConversationEntity _conversationModelToEntity(ConversationModel model) {
    return ConversationEntity(
      id: model.id,
      title: model.title,
      messageIds: model.messageIds,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      context: model.context,
      isActive: model.isActive,
    );
  }

  ChatMessageEntity _chatMessageModelToEntity(ChatMessageModel model) {
    return ChatMessageEntity(
      id: model.id,
      conversationId: model.conversationId,
      content: model.content,
      sender: model.sender,
      timestamp: model.timestamp,
      messageType: model.messageType,
      metadata: model.metadata,
      isProcessing: model.isProcessing,
    );
  }
}
