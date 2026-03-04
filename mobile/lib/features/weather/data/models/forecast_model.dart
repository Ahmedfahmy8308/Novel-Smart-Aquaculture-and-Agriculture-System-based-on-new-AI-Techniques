class ForecastModel {
  final String location;
  final List<DailyForecast> dailyForecasts;
  final List<HourlyForecast> hourlyForecasts;
  final DateTime generatedAt;

  const ForecastModel({
    required this.location,
    required this.dailyForecasts,
    required this.hourlyForecasts,
    required this.generatedAt,
  });

  factory ForecastModel.fromJson(Map<String, dynamic> json) {
    return ForecastModel(
      location: json['location'] as String,
      dailyForecasts:
          (json['daily_forecasts'] as List)
              .map((forecast) => DailyForecast.fromJson(forecast))
              .toList(),
      hourlyForecasts:
          (json['hourly_forecasts'] as List)
              .map((forecast) => HourlyForecast.fromJson(forecast))
              .toList(),
      generatedAt: DateTime.parse(json['generated_at'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'location': location,
      'daily_forecasts': dailyForecasts.map((f) => f.toJson()).toList(),
      'hourly_forecasts': hourlyForecasts.map((f) => f.toJson()).toList(),
      'generated_at': generatedAt.toIso8601String(),
    };
  }
}

class DailyForecast {
  final DateTime date;
  final double maxTemp;
  final double minTemp;
  final String condition;
  final double precipitation;
  final double humidity;

  const DailyForecast({
    required this.date,
    required this.maxTemp,
    required this.minTemp,
    required this.condition,
    required this.precipitation,
    required this.humidity,
  });

  factory DailyForecast.fromJson(Map<String, dynamic> json) {
    return DailyForecast(
      date: DateTime.parse(json['date'] as String),
      maxTemp: (json['max_temp'] as num).toDouble(),
      minTemp: (json['min_temp'] as num).toDouble(),
      condition: json['condition'] as String,
      precipitation: (json['precipitation'] as num).toDouble(),
      humidity: (json['humidity'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'date': date.toIso8601String(),
      'max_temp': maxTemp,
      'min_temp': minTemp,
      'condition': condition,
      'precipitation': precipitation,
      'humidity': humidity,
    };
  }
}

class HourlyForecast {
  final DateTime hour;
  final double temperature;
  final String condition;
  final double precipitation;
  final double windSpeed;

  const HourlyForecast({
    required this.hour,
    required this.temperature,
    required this.condition,
    required this.precipitation,
    required this.windSpeed,
  });

  factory HourlyForecast.fromJson(Map<String, dynamic> json) {
    return HourlyForecast(
      hour: DateTime.parse(json['hour'] as String),
      temperature: (json['temperature'] as num).toDouble(),
      condition: json['condition'] as String,
      precipitation: (json['precipitation'] as num).toDouble(),
      windSpeed: (json['wind_speed'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'hour': hour.toIso8601String(),
      'temperature': temperature,
      'condition': condition,
      'precipitation': precipitation,
      'wind_speed': windSpeed,
    };
  }
}
