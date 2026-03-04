import '../entities/weather_entity.dart';
import '../repositories/weather_repository_interface.dart';

class GetCurrentWeatherUseCase {
  final WeatherRepositoryInterface _repository;

  const GetCurrentWeatherUseCase(this._repository);

  Future<WeatherEntity> execute(String location) async {
    if (location.isEmpty) {
      throw ArgumentError('Location cannot be empty');
    }

    try {
      return await _repository.getCurrentWeather(location);
    } catch (e) {
      throw Exception('Failed to get current weather: $e');
    }
  }
}
