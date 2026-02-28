import '../entities/conversation_entity.dart';
import '../repositories/chat_repository_interface.dart';

class GetConversationsUseCase {
  final ChatRepositoryInterface _repository;

  const GetConversationsUseCase(this._repository);

  Future<List<ConversationEntity>> execute() async {
    try {
      final conversations = await _repository.getConversations();
      // Sort by most recent first
      conversations.sort((a, b) => b.updatedAt.compareTo(a.updatedAt));
      return conversations;
    } catch (e) {
      throw Exception('Failed to get conversations: $e');
    }
  }
}
