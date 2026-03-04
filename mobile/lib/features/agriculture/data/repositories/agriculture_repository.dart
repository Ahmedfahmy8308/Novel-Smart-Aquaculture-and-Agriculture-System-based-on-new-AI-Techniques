import '../../domain/entities/crop_entity.dart';
import '../../domain/entities/pest_entity.dart';
import '../../domain/repositories/agriculture_repository_interface.dart';
import '../models/crop_model.dart';
import '../models/pest_model.dart';
import '../../../../services/plant_service_api.dart';

class AgricultureRepository implements AgricultureRepositoryInterface {
  final PlantServiceApi _plantService;

  const AgricultureRepository(this._plantService);

  @override
  Future<List<CropEntity>> getCrops() async {
    try {
      final crops = await _plantService.getCrops();
      return crops.map((model) => _cropModelToEntity(model)).toList();
    } catch (e) {
      throw Exception('Failed to get crops: $e');
    }
  }

  @override
  Future<CropEntity> getCropById(String cropId) async {
    try {
      final crop = await _plantService.getCropById(cropId);
      return _cropModelToEntity(crop);
    } catch (e) {
      throw Exception('Failed to get crop: $e');
    }
  }

  @override
  Future<CropEntity> analyzeCropHealth(String imagePath) async {
    try {
      final response = await _plantService.analyzeCropHealth(imagePath);
      // Convert the response map to a CropModel - this assumes the API returns crop data
      // In a real implementation, you might need to adapt this based on your API response structure
      final cropModel = CropModel(
        id: response['id'] ?? 'unknown',
        name: response['name'] ?? 'Unknown Crop',
        variety: response['variety'] ?? 'Unknown',
        healthStatus: response['health_status'] ?? 'analyzed',
        area: (response['area'] as num?)?.toDouble() ?? 0.0,
        plantedDate:
            response['planted_date'] != null
                ? DateTime.parse(response['planted_date'] as String)
                : DateTime.now(),
        harvestDate:
            response['harvest_date'] != null
                ? DateTime.parse(response['harvest_date'] as String)
                : null,
        diseaseInfo: response['disease_info'] as Map<String, dynamic>?,
        yieldPrediction: response['yield_prediction'] as Map<String, dynamic>?,
      );
      return _cropModelToEntity(cropModel);
    } catch (e) {
      throw Exception('Failed to analyze crop health: $e');
    }
  }

  @override
  Future<List<PestEntity>> identifyPests(String imagePath) async {
    try {
      final pests = await _plantService.identifyPests(imagePath);
      return pests.map((model) => _pestModelToEntity(model)).toList();
    } catch (e) {
      throw Exception('Failed to identify pests: $e');
    }
  }

  @override
  Future<Map<String, dynamic>> predictYield(String cropId) async {
    try {
      return await _plantService.predictYield(cropId);
    } catch (e) {
      throw Exception('Failed to predict yield: $e');
    }
  }

  @override
  Future<List<String>> getCropRecommendations(
    Map<String, dynamic> soilData,
  ) async {
    try {
      return await _plantService.getCropRecommendations(soilData);
    } catch (e) {
      throw Exception('Failed to get crop recommendations: $e');
    }
  }

  @override
  Future<Map<String, dynamic>> getGrowthOptimization(String cropId) async {
    try {
      return await _plantService.getGrowthOptimization(cropId);
    } catch (e) {
      throw Exception('Failed to get growth optimization: $e');
    }
  }

  CropEntity _cropModelToEntity(CropModel model) {
    return CropEntity(
      id: model.id,
      name: model.name,
      variety: model.variety,
      healthStatus: model.healthStatus,
      area: model.area,
      plantedDate: model.plantedDate,
      harvestDate: model.harvestDate,
      diseaseInfo: model.diseaseInfo,
      yieldPrediction: model.yieldPrediction,
    );
  }

  PestEntity _pestModelToEntity(PestModel model) {
    return PestEntity(
      id: model.id,
      name: model.name,
      type: model.type,
      severity: model.severity,
      description: model.description,
      affectedCrops: model.affectedCrops,
      treatmentRecommendations: model.treatmentRecommendations,
      identifiedDate: model.identifiedDate,
    );
  }
}
