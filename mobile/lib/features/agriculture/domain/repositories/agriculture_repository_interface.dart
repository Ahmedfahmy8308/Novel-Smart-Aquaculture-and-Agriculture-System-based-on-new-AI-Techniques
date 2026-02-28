import '../entities/crop_entity.dart';
import '../entities/pest_entity.dart';

abstract class AgricultureRepositoryInterface {
  Future<List<CropEntity>> getCrops();
  Future<CropEntity> getCropById(String cropId);
  Future<CropEntity> analyzeCropHealth(String imagePath);
  Future<List<PestEntity>> identifyPests(String imagePath);
  Future<Map<String, dynamic>> predictYield(String cropId);
  Future<List<String>> getCropRecommendations(Map<String, dynamic> soilData);
  Future<Map<String, dynamic>> getGrowthOptimization(String cropId);
}
