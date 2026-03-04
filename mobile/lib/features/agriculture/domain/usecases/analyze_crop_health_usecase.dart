import '../entities/crop_entity.dart';
import '../repositories/agriculture_repository_interface.dart';

class AnalyzeCropHealthUseCase {
  final AgricultureRepositoryInterface _repository;

  const AnalyzeCropHealthUseCase(this._repository);

  Future<CropEntity> execute(String imagePath) async {
    if (imagePath.isEmpty) {
      throw ArgumentError('Image path cannot be empty');
    }

    try {
      return await _repository.analyzeCropHealth(imagePath);
    } catch (e) {
      throw Exception('Failed to analyze crop health: $e');
    }
  }
}
