import '../config/api_config.dart';
import '../core/network/api_client.dart';
import '../core/errors/exceptions.dart';

class SmartMlServiceApi {
  static final SmartMlServiceApi _instance = SmartMlServiceApi._internal();
  factory SmartMlServiceApi() => _instance;
  SmartMlServiceApi._internal();

  final ApiClient _apiClient = ApiClient();

  Future<Map<String, dynamic>> predictPrices(Map<String, dynamic> data) async {
    try {
      return await _apiClient.post(
        '/ml/price-prediction',
        data,
        baseUrl: ApiConfig.smartMlServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to predict prices: $e');
    }
  }

  Future<Map<String, dynamic>> forecastWeather(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/ml/weather-forecast',
        data,
        baseUrl: ApiConfig.smartMlServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to forecast weather: $e');
    }
  }

  Future<Map<String, dynamic>> optimizeEnergyUsage(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/ml/energy-optimization',
        data,
        baseUrl: ApiConfig.smartMlServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to optimize energy usage: $e');
    }
  }

  Future<Map<String, dynamic>> predictDemand(Map<String, dynamic> data) async {
    try {
      return await _apiClient.post(
        '/ml/demand-prediction',
        data,
        baseUrl: ApiConfig.smartMlServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to predict demand: $e');
    }
  }

  Future<Map<String, dynamic>> analyzeMarketTrends(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/ml/market-analysis',
        data,
        baseUrl: ApiConfig.smartMlServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to analyze market trends: $e');
    }
  }

  Future<Map<String, dynamic>> optimizeResources(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/ml/resource-optimization',
        data,
        baseUrl: ApiConfig.smartMlServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to optimize resources: $e');
    }
  }

  Future<Map<String, dynamic>> getRiskAssessment(
    Map<String, dynamic> data,
  ) async {
    try {
      return await _apiClient.post(
        '/ml/risk-assessment',
        data,
        baseUrl: ApiConfig.smartMlServiceUrl,
      );
    } on AppException {
      rethrow;
    } catch (e) {
      throw ServerException('Failed to get risk assessment: $e');
    }
  }
}
