import '../config/api_config.dart';
import '../core/network/api_client.dart';
import '../core/errors/exceptions.dart';
import '../features/agriculture/data/models/crop_model.dart';
import '../features/agriculture/data/models/pest_model.dart';

class PlantServiceApi {
  static final PlantServiceApi _instance = PlantServiceApi._internal();
  factory PlantServiceApi() => _instance;
  PlantServiceApi._internal();

  final ApiClient _apiClient = ApiClient();

  Future<Map<String, dynamic>> analyzeDisease(String imagePath) async {
    try {
      return await _apiClient.uploadFile(
        '/plant/disease-detection',
        imagePath,
        baseUrl: ApiConfig.plantServiceUrl,
        fieldName: 'image',
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to analyze plant disease: $e');
    }
  }

  Future<Map<String, dynamic>> analyzeCropHealth(String imagePath) async {
    try {
      return await _apiClient.uploadFile(
        '/plant/crop-health',
        imagePath,
        baseUrl: ApiConfig.plantServiceUrl,
        fieldName: 'image',
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to analyze crop health: $e');
    }
  }

  Future<Map<String, dynamic>> identifyPlant(String imagePath) async {
    try {
      return await _apiClient.uploadFile(
        '/plant/identification',
        imagePath,
        baseUrl: ApiConfig.plantServiceUrl,
        fieldName: 'image',
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to identify plant: $e');
    }
  }

  Future<Map<String, dynamic>> getPestRecommendations(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/plant/pest-recommendations',
        data,
        baseUrl: ApiConfig.plantServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get pest recommendations: $e');
    }
  }

  Future<Map<String, dynamic>> predictYieldFromData(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/plant/yield-prediction',
        data,
        baseUrl: ApiConfig.plantServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to predict yield: $e');
    }
  }

  // New methods for Agriculture feature
  Future<List<CropModel>> getCrops() async {
    try {
      final response = await _apiClient.get(
        '/agriculture/crops',
        baseUrl: ApiConfig.plantServiceUrl,
      );
      final List<dynamic> cropsJson = response['crops'];
      return cropsJson.map((json) => CropModel.fromJson(json)).toList();
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get crops: $e');
    }
  }

  Future<CropModel> getCropById(String cropId) async {
    try {
      final response = await _apiClient.get(
        '/agriculture/crops/$cropId',
        baseUrl: ApiConfig.plantServiceUrl,
      );
      return CropModel.fromJson(response['crop']);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get crop: $e');
    }
  }

  Future<List<PestModel>> identifyPests(String imagePath) async {
    try {
      final response = await _apiClient.uploadFile(
        '/agriculture/pests/identify',
        imagePath,
        baseUrl: ApiConfig.plantServiceUrl,
        fieldName: 'image',
      );
      final List<dynamic> pestsJson = response['pests'];
      return pestsJson.map((json) => PestModel.fromJson(json)).toList();
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to identify pests: $e');
    }
  }

  Future<Map<String, dynamic>> predictYield(String cropId) async {
    try {
      return await _apiClient.get(
        '/agriculture/crops/$cropId/yield-prediction',
        baseUrl: ApiConfig.plantServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to predict yield for crop: $e');
    }
  }

  Future<List<String>> getCropRecommendations(
    Map<String, dynamic> soilData,
  ) async {
    try {
      final response = await _apiClient.post(
        '/agriculture/crops/recommendations',
        {'soil_data': soilData},
        baseUrl: ApiConfig.plantServiceUrl,
      );
      return List<String>.from(response['recommendations']);
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get crop recommendations: $e');
    }
  }

  Future<Map<String, dynamic>> getGrowthOptimization(String cropId) async {
    try {
      return await _apiClient.get(
        '/agriculture/crops/$cropId/optimization',
        baseUrl: ApiConfig.plantServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get growth optimization: $e');
    }
  }
}
