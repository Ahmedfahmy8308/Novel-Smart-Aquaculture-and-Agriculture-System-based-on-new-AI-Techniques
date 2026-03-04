import '../entities/forecast_entity.dart';
import '../repositories/weather_repository_interface.dart';

class GetWeatherForecastUseCase {
  final WeatherRepositoryInterface _repository;

  const GetWeatherForecastUseCase(this._repository);

  Future<ForecastEntity> execute(String location, {int days = 7}) async {
    if (location.isEmpty) {
      throw ArgumentError('Location cannot be empty');
    }

    if (days < 1 || days > 14) {
      throw ArgumentError('Days must be between 1 and 14');
    }

    try {
      return await _repository.getForecast(location, days: days);
    } catch (e) {
      throw Exception('Failed to get weather forecast: $e');
    }
  }
}
