import '../../domain/entities/energy_usage_entity.dart';
import '../../domain/entities/optimization_entity.dart';
import '../../domain/repositories/energy_repository_interface.dart';
import '../models/energy_usage_model.dart';
import '../models/optimization_model.dart';
import '../../../../core/network/api_client.dart';

class EnergyRepository implements EnergyRepositoryInterface {
  final ApiClient _apiClient;

  const EnergyRepository(this._apiClient);

  @override
  Future<List<EnergyUsageEntity>> getEnergyUsage(
    DateTime startDate,
    DateTime endDate,
  ) async {
    try {
      final response = await _apiClient.get(
        '/energy/usage?start=${startDate.toIso8601String()}&end=${endDate.toIso8601String()}',
      );
      final List<dynamic> data = response['usage'];
      return data
          .map(
            (json) =>
                _energyUsageModelToEntity(EnergyUsageModel.fromJson(json)),
          )
          .toList();
    } catch (e) {
      throw Exception('Failed to get energy usage: $e');
    }
  }

  @override
  Future<EnergyUsageEntity> getDeviceUsage(
    String deviceId,
    DateTime date,
  ) async {
    try {
      final response = await _apiClient.get(
        '/energy/device/$deviceId?date=${date.toIso8601String()}',
      );
      final model = EnergyUsageModel.fromJson(response);
      return _energyUsageModelToEntity(model);
    } catch (e) {
      throw Exception('Failed to get device usage: $e');
    }
  }

  @override
  Future<OptimizationEntity> getOptimizationRecommendations() async {
    try {
      final response = await _apiClient.get('/energy/optimization');
      final model = OptimizationModel.fromJson(response);
      return _optimizationModelToEntity(model);
    } catch (e) {
      throw Exception('Failed to get optimization recommendations: $e');
    }
  }

  @override
  Future<Map<String, dynamic>> getEnergyAnalytics(
    DateTime startDate,
    DateTime endDate,
  ) async {
    try {
      final response = await _apiClient.get(
        '/energy/analytics?start=${startDate.toIso8601String()}&end=${endDate.toIso8601String()}',
      );
      return response['analytics'];
    } catch (e) {
      throw Exception('Failed to get energy analytics: $e');
    }
  }

  @override
  Future<List<String>> getConnectedDevices() async {
    try {
      final response = await _apiClient.get('/energy/devices');
      return List<String>.from(response['devices']);
    } catch (e) {
      throw Exception('Failed to get connected devices: $e');
    }
  }

  @override
  Future<bool> updateDeviceSettings(
    String deviceId,
    Map<String, dynamic> settings,
  ) async {
    try {
      await _apiClient.put('/energy/device/$deviceId/settings', settings);
      return true;
    } catch (e) {
      throw Exception('Failed to update device settings: $e');
    }
  }

  @override
  Future<Map<String, dynamic>> getCostAnalysis(
    DateTime startDate,
    DateTime endDate,
  ) async {
    try {
      final response = await _apiClient.get(
        '/energy/cost-analysis?start=${startDate.toIso8601String()}&end=${endDate.toIso8601String()}',
      );
      return response['analysis'];
    } catch (e) {
      throw Exception('Failed to get cost analysis: $e');
    }
  }

  EnergyUsageEntity _energyUsageModelToEntity(EnergyUsageModel model) {
    return EnergyUsageEntity(
      id: model.id,
      deviceId: model.deviceId,
      deviceName: model.deviceName,
      consumption: model.consumption,
      cost: model.cost,
      timestamp: model.timestamp,
      category: model.category,
      metadata: model.metadata,
    );
  }

  OptimizationEntity _optimizationModelToEntity(OptimizationModel model) {
    return OptimizationEntity(
      id: model.id,
      type: model.type,
      currentValue: model.currentValue,
      optimizedValue: model.optimizedValue,
      savings: model.savings,
      recommendations:
          model.recommendations
              .map(
                (rec) => OptimizationRecommendationEntity(
                  action: rec.action,
                  description: rec.description,
                  potentialSavings: rec.potentialSavings,
                  priority: rec.priority,
                  parameters: rec.parameters,
                ),
              )
              .toList(),
      generatedAt: model.generatedAt,
      validUntil: model.validUntil,
    );
  }
}
