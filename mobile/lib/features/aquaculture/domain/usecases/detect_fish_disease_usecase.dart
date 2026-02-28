import '../repositories/fish_repository_interface.dart';
import '../../../../core/errors/exceptions.dart';

class DetectFishDiseaseUseCase {
  final FishRepositoryInterface _repository;

  DetectFishDiseaseUseCase(this._repository);

  Future<Map<String, dynamic>> execute(String imagePath) async {
    if (imagePath.isEmpty) {
      throw const ValidationException('Image path cannot be empty');
    }

    try {
      return await _repository.detectDisease(imagePath);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to detect fish disease: $e');
    }
  }
}
