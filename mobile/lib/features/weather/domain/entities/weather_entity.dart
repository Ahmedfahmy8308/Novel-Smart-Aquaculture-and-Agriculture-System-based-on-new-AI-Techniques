class WeatherEntity {
  final String location;
  final double temperature;
  final double humidity;
  final double windSpeed;
  final String windDirection;
  final double precipitation;
  final double pressure;
  final String condition;
  final int visibility;
  final int uvIndex;
  final DateTime timestamp;

  const WeatherEntity({
    required this.location,
    required this.temperature,
    required this.humidity,
    required this.windSpeed,
    required this.windDirection,
    required this.precipitation,
    required this.pressure,
    required this.condition,
    required this.visibility,
    required this.uvIndex,
    required this.timestamp,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is WeatherEntity &&
        other.location == location &&
        other.temperature == temperature &&
        other.timestamp == timestamp;
  }

  @override
  int get hashCode {
    return Object.hash(location, temperature, timestamp);
  }

  @override
  String toString() {
    return 'WeatherEntity(location: $location, temperature: $temperature°C, condition: $condition)';
  }
}
