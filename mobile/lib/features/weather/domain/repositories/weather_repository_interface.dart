import '../entities/weather_entity.dart';
import '../entities/forecast_entity.dart';

abstract class WeatherRepositoryInterface {
  Future<WeatherEntity> getCurrentWeather(String location);
  Future<ForecastEntity> getForecast(String location, {int days = 7});
  Future<List<WeatherEntity>> getWeatherHistory(
    String location,
    DateTime startDate,
    DateTime endDate,
  );
  Future<Map<String, dynamic>> getWeatherAlerts(String location);
  Future<Map<String, dynamic>> getAgriculturalWeatherAdvice(
    String location,
    List<String> crops,
  );
}
