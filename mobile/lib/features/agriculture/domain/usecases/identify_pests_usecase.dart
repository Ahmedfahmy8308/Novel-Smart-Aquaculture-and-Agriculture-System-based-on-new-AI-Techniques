import '../entities/pest_entity.dart';
import '../repositories/agriculture_repository_interface.dart';

class IdentifyPestsUseCase {
  final AgricultureRepositoryInterface _repository;

  const IdentifyPestsUseCase(this._repository);

  Future<List<PestEntity>> execute(String imagePath) async {
    if (imagePath.isEmpty) {
      throw ArgumentError('Image path cannot be empty');
    }

    try {
      return await _repository.identifyPests(imagePath);
    } catch (e) {
      throw Exception('Failed to identify pests: $e');
    }
  }
}
