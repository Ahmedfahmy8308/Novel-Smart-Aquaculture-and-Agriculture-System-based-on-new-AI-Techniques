import '../config/api_config.dart';
import '../core/network/api_client.dart';
import '../core/errors/exceptions.dart';

class FishServiceApi {
  static final FishServiceApi _instance = FishServiceApi._internal();
  factory FishServiceApi() => _instance;
  FishServiceApi._internal();

  final ApiClient _apiClient = ApiClient();

  Future<Map<String, dynamic>> detectDisease(String imagePath) async {
    try {
      return await _apiClient.uploadFile(
        '/fish/disease-detection',
        imagePath,
        baseUrl: ApiConfig.fishServiceUrl,
        fieldName: 'image',
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to detect fish disease: $e');
    }
  }

  Future<Map<String, dynamic>> analyzeGrowth(String imagePath) async {
    try {
      return await _apiClient.uploadFile(
        '/fish/growth-analysis',
        imagePath,
        baseUrl: ApiConfig.fishServiceUrl,
        fieldName: 'image',
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to analyze fish growth: $e');
    }
  }

  Future<Map<String, dynamic>> countFish(String imagePath) async {
    try {
      return await _apiClient.uploadFile(
        '/fish/counting',
        imagePath,
        baseUrl: ApiConfig.fishServiceUrl,
        fieldName: 'image',
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to count fish: $e');
    }
  }

  Future<Map<String, dynamic>> analyzeFeedingBehavior(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/fish/feeding-behavior',
        data,
        baseUrl: ApiConfig.fishServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to analyze feeding behavior: $e');
    }
  }

  Future<Map<String, dynamic>> getWaterQualityRecommendations(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/fish/water-quality',
        data,
        baseUrl: ApiConfig.fishServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get water quality recommendations: $e');
    }
  }

  Future<Map<String, dynamic>> predictHarvest(Map<String, dynamic> data) async {
    try {
      return await _apiClient.post(
        '/fish/harvest-prediction',
        data,
        baseUrl: ApiConfig.fishServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to predict harvest: $e');
    }
  }
}
