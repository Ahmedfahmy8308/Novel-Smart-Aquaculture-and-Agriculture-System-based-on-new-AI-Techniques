import '../entities/energy_usage_entity.dart';
import '../entities/optimization_entity.dart';

abstract class EnergyRepositoryInterface {
  Future<List<EnergyUsageEntity>> getEnergyUsage(
    DateTime startDate,
    DateTime endDate,
  );
  Future<EnergyUsageEntity> getDeviceUsage(String deviceId, DateTime date);
  Future<OptimizationEntity> getOptimizationRecommendations();
  Future<Map<String, dynamic>> getEnergyAnalytics(
    DateTime startDate,
    DateTime endDate,
  );
  Future<List<String>> getConnectedDevices();
  Future<bool> updateDeviceSettings(
    String deviceId,
    Map<String, dynamic> settings,
  );
  Future<Map<String, dynamic>> getCostAnalysis(
    DateTime startDate,
    DateTime endDate,
  );
}
