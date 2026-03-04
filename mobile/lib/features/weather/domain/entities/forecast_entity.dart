class ForecastEntity {
  final String location;
  final List<DailyForecastEntity> dailyForecasts;
  final List<HourlyForecastEntity> hourlyForecasts;
  final DateTime generatedAt;

  const ForecastEntity({
    required this.location,
    required this.dailyForecasts,
    required this.hourlyForecasts,
    required this.generatedAt,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is ForecastEntity &&
        other.location == location &&
        other.generatedAt == generatedAt;
  }

  @override
  int get hashCode {
    return Object.hash(location, generatedAt);
  }

  @override
  String toString() {
    return 'ForecastEntity(location: $location, days: ${dailyForecasts.length})';
  }
}

class DailyForecastEntity {
  final DateTime date;
  final double maxTemp;
  final double minTemp;
  final String condition;
  final double precipitation;
  final double humidity;

  const DailyForecastEntity({
    required this.date,
    required this.maxTemp,
    required this.minTemp,
    required this.condition,
    required this.precipitation,
    required this.humidity,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is DailyForecastEntity && other.date == date;
  }

  @override
  int get hashCode => date.hashCode;
}

class HourlyForecastEntity {
  final DateTime hour;
  final double temperature;
  final String condition;
  final double precipitation;
  final double windSpeed;

  const HourlyForecastEntity({
    required this.hour,
    required this.temperature,
    required this.condition,
    required this.precipitation,
    required this.windSpeed,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is HourlyForecastEntity && other.hour == hour;
  }

  @override
  int get hashCode => hour.hashCode;
}
