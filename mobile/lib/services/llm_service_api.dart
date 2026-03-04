import '../config/api_config.dart';
import '../core/network/api_client.dart';
import '../core/errors/exceptions.dart';
import '../features/chatbot/data/models/chat_message_model.dart';
import '../features/chatbot/data/models/conversation_model.dart';

class LlmServiceApi {
  static final LlmServiceApi _instance = LlmServiceApi._internal();
  factory LlmServiceApi() => _instance;
  LlmServiceApi._internal();

  final ApiClient _apiClient = ApiClient();

  Future<Map<String, dynamic>> sendChatMessage(
    String message, {
    String? conversationId,
  }) async {
    try {
      return await _apiClient.post('/chat/message', {
        'message': message,
        'conversation_id': conversationId,
      }, baseUrl: ApiConfig.llmServiceUrl);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to send chat message: $e');
    }
  }

  Future<Map<String, dynamic>> startConversation(String? context) async {
    try {
      return await _apiClient.post('/chat/start', {
        'context': context,
      }, baseUrl: ApiConfig.llmServiceUrl);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to start conversation: $e');
    }
  }

  Future<Map<String, dynamic>> getConversationHistory(
    String conversationId,
  ) async {
    try {
      return await _apiClient.get(
        '/chat/history/$conversationId',
        baseUrl: ApiConfig.llmServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get conversation history: $e');
    }
  }

  Future<Map<String, dynamic>> generateReport(Map<String, dynamic> data) async {
    try {
      return await _apiClient.post(
        '/generate/report',
        data,
        baseUrl: ApiConfig.llmServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to generate report: $e');
    }
  }

  Future<Map<String, dynamic>> summarizeData(Map<String, dynamic> data) async {
    try {
      return await _apiClient.post(
        '/generate/summary',
        data,
        baseUrl: ApiConfig.llmServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to summarize data: $e');
    }
  }

  Future<Map<String, dynamic>> getRecommendations(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/generate/recommendations',
        data,
        baseUrl: ApiConfig.llmServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get recommendations: $e');
    }
  }

  // New methods for Chatbot feature
  Future<List<ConversationModel>> getConversations() async {
    try {
      final response = await _apiClient.get(
        '/chat/conversations',
        baseUrl: ApiConfig.llmServiceUrl,
      );
      final List<dynamic> conversationsJson = response['conversations'];
      return conversationsJson
          .map((json) => ConversationModel.fromJson(json))
          .toList();
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get conversations: $e');
    }
  }

  Future<ConversationModel> createConversation(
    String title,
    Map<String, dynamic> context,
  ) async {
    try {
      final response = await _apiClient.post('/chat/conversations', {
        'title': title,
        'context': context,
      }, baseUrl: ApiConfig.llmServiceUrl);
      return ConversationModel.fromJson(response['conversation']);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to create conversation: $e');
    }
  }

  Future<ConversationModel> getConversation(String conversationId) async {
    try {
      final response = await _apiClient.get(
        '/chat/conversations/$conversationId',
        baseUrl: ApiConfig.llmServiceUrl,
      );
      return ConversationModel.fromJson(response['conversation']);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get conversation: $e');
    }
  }

  Future<List<ChatMessageModel>> getMessages(String conversationId) async {
    try {
      final response = await _apiClient.get(
        '/chat/conversations/$conversationId/messages',
        baseUrl: ApiConfig.llmServiceUrl,
      );
      final List<dynamic> messagesJson = response['messages'];
      return messagesJson
          .map((json) => ChatMessageModel.fromJson(json))
          .toList();
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get messages: $e');
    }
  }

  Future<ChatMessageModel> sendMessage(
    String conversationId,
    String content, {
    String? messageType,
  }) async {
    try {
      final response = await _apiClient.post(
        '/chat/conversations/$conversationId/messages',
        {'content': content, 'message_type': messageType},
        baseUrl: ApiConfig.llmServiceUrl,
      );
      return ChatMessageModel.fromJson(response['message']);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to send message: $e');
    }
  }

  Future<ChatMessageModel> getChatResponse(
    String conversationId,
    String userMessage,
  ) async {
    try {
      final response = await _apiClient.post(
        '/chat/conversations/$conversationId/response',
        {'user_message': userMessage},
        baseUrl: ApiConfig.llmServiceUrl,
      );
      return ChatMessageModel.fromJson(response['response']);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get chat response: $e');
    }
  }

  Future<void> deleteConversation(String conversationId) async {
    try {
      await _apiClient.delete(
        '/chat/conversations/$conversationId',
        baseUrl: ApiConfig.llmServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to delete conversation: $e');
    }
  }

  Future<ConversationModel> updateConversationTitle(
    String conversationId,
    String title,
  ) async {
    try {
      final response = await _apiClient.put(
        '/chat/conversations/$conversationId',
        {'title': title},
        baseUrl: ApiConfig.llmServiceUrl,
      );
      return ConversationModel.fromJson(response['conversation']);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to update conversation title: $e');
    }
  }
}
