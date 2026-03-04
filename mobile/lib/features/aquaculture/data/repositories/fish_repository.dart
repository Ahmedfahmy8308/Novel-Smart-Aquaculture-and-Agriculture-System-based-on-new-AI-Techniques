import '../../../../services/fish_service_api.dart';
import '../../domain/repositories/fish_repository_interface.dart';
import '../../domain/entities/fish_entity.dart';
import '../../../../core/errors/exceptions.dart';

class FishRepository implements FishRepositoryInterface {
  final FishServiceApi _fishServiceApi;

  FishRepository(this._fishServiceApi);

  @override
  Future<Map<String, dynamic>> detectDisease(String imagePath) async {
    try {
      return await _fishServiceApi.detectDisease(imagePath);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to detect fish disease: $e');
    }
  }

  @override
  Future<Map<String, dynamic>> analyzeGrowth(String imagePath) async {
    try {
      return await _fishServiceApi.analyzeGrowth(imagePath);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to analyze fish growth: $e');
    }
  }

  @override
  Future<Map<String, dynamic>> countFish(String imagePath) async {
    try {
      return await _fishServiceApi.countFish(imagePath);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to count fish: $e');
    }
  }

  @override
  Future<List<FishEntity>> getFishList() async {
    try {
      // Mock implementation - replace with actual API call
      return [];
    } catch (e) {
      throw ServerException('Failed to get fish list: $e');
    }
  }

  @override
  Future<FishEntity> getFishById(String id) async {
    try {
      // Mock implementation - replace with actual API call
      throw const ServerException('Fish not found');
    } catch (e) {
      throw ServerException('Failed to get fish: $e');
    }
  }
}
