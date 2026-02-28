import '../entities/energy_usage_entity.dart';
import '../repositories/energy_repository_interface.dart';

class GetEnergyUsageUseCase {
  final EnergyRepositoryInterface _repository;

  const GetEnergyUsageUseCase(this._repository);

  Future<List<EnergyUsageEntity>> execute(
    DateTime startDate,
    DateTime endDate,
  ) async {
    if (startDate.isAfter(endDate)) {
      throw ArgumentError('Start date must be before end date');
    }

    final difference = endDate.difference(startDate);
    if (difference.inDays > 365) {
      throw ArgumentError('Date range cannot exceed 365 days');
    }

    try {
      return await _repository.getEnergyUsage(startDate, endDate);
    } catch (e) {
      throw Exception('Failed to get energy usage: $e');
    }
  }
}
