import '../../domain/entities/weather_entity.dart';
import '../../domain/entities/forecast_entity.dart';
import '../../domain/repositories/weather_repository_interface.dart';
import '../models/weather_model.dart';
import '../models/forecast_model.dart';
import '../../../../core/network/api_client.dart';

class WeatherRepository implements WeatherRepositoryInterface {
  final ApiClient _apiClient;

  const WeatherRepository(this._apiClient);

  @override
  Future<WeatherEntity> getCurrentWeather(String location) async {
    try {
      final response = await _apiClient.get(
        '/weather/current?location=$location',
      );
      final model = WeatherModel.fromJson(response);
      return _weatherModelToEntity(model);
    } catch (e) {
      throw Exception('Failed to get current weather: $e');
    }
  }

  @override
  Future<ForecastEntity> getForecast(String location, {int days = 7}) async {
    try {
      final response = await _apiClient.get(
        '/weather/forecast?location=$location&days=$days',
      );
      final model = ForecastModel.fromJson(response);
      return _forecastModelToEntity(model);
    } catch (e) {
      throw Exception('Failed to get weather forecast: $e');
    }
  }

  @override
  Future<List<WeatherEntity>> getWeatherHistory(
    String location,
    DateTime startDate,
    DateTime endDate,
  ) async {
    try {
      final response = await _apiClient.get(
        '/weather/history?location=$location&start=${startDate.toIso8601String()}&end=${endDate.toIso8601String()}',
      );
      final List<dynamic> data = response['history'];
      return data
          .map((json) => _weatherModelToEntity(WeatherModel.fromJson(json)))
          .toList();
    } catch (e) {
      throw Exception('Failed to get weather history: $e');
    }
  }

  @override
  Future<Map<String, dynamic>> getWeatherAlerts(String location) async {
    try {
      final response = await _apiClient.get(
        '/weather/alerts?location=$location',
      );
      return response['alerts'];
    } catch (e) {
      throw Exception('Failed to get weather alerts: $e');
    }
  }

  @override
  Future<Map<String, dynamic>> getAgriculturalWeatherAdvice(
    String location,
    List<String> crops,
  ) async {
    try {
      final response = await _apiClient.post('/weather/agricultural-advice', {
        'location': location,
        'crops': crops,
      });
      return response['advice'];
    } catch (e) {
      throw Exception('Failed to get agricultural weather advice: $e');
    }
  }

  WeatherEntity _weatherModelToEntity(WeatherModel model) {
    return WeatherEntity(
      location: model.location,
      temperature: model.temperature,
      humidity: model.humidity,
      windSpeed: model.windSpeed,
      windDirection: model.windDirection,
      precipitation: model.precipitation,
      pressure: model.pressure,
      condition: model.condition,
      visibility: model.visibility,
      uvIndex: model.uvIndex,
      timestamp: model.timestamp,
    );
  }

  ForecastEntity _forecastModelToEntity(ForecastModel model) {
    return ForecastEntity(
      location: model.location,
      dailyForecasts:
          model.dailyForecasts
              .map(
                (daily) => DailyForecastEntity(
                  date: daily.date,
                  maxTemp: daily.maxTemp,
                  minTemp: daily.minTemp,
                  condition: daily.condition,
                  precipitation: daily.precipitation,
                  humidity: daily.humidity,
                ),
              )
              .toList(),
      hourlyForecasts:
          model.hourlyForecasts
              .map(
                (hourly) => HourlyForecastEntity(
                  hour: hourly.hour,
                  temperature: hourly.temperature,
                  condition: hourly.condition,
                  precipitation: hourly.precipitation,
                  windSpeed: hourly.windSpeed,
                ),
              )
              .toList(),
      generatedAt: model.generatedAt,
    );
  }
}
