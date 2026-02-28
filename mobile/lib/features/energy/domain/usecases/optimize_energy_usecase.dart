import '../entities/optimization_entity.dart';
import '../repositories/energy_repository_interface.dart';

class OptimizeEnergyUseCase {
  final EnergyRepositoryInterface _repository;

  const OptimizeEnergyUseCase(this._repository);

  Future<OptimizationEntity> execute() async {
    try {
      return await _repository.getOptimizationRecommendations();
    } catch (e) {
      throw Exception('Failed to get energy optimization: $e');
    }
  }
}
