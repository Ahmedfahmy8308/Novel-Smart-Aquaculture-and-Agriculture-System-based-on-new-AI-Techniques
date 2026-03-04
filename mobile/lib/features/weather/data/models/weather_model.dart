class WeatherModel {
  final String location;
  final double temperature;
  final double humidity;
  final double windSpeed;
  final String windDirection;
  final double precipitation;
  final double pressure;
  final String condition; // sunny, cloudy, rainy, etc.
  final int visibility;
  final int uvIndex;
  final DateTime timestamp;

  const WeatherModel({
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

  factory WeatherModel.fromJson(Map<String, dynamic> json) {
    return WeatherModel(
      location: json['location'] as String,
      temperature: (json['temperature'] as num).toDouble(),
      humidity: (json['humidity'] as num).toDouble(),
      windSpeed: (json['wind_speed'] as num).toDouble(),
      windDirection: json['wind_direction'] as String,
      precipitation: (json['precipitation'] as num).toDouble(),
      pressure: (json['pressure'] as num).toDouble(),
      condition: json['condition'] as String,
      visibility: json['visibility'] as int,
      uvIndex: json['uv_index'] as int,
      timestamp: DateTime.parse(json['timestamp'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'location': location,
      'temperature': temperature,
      'humidity': humidity,
      'wind_speed': windSpeed,
      'wind_direction': windDirection,
      'precipitation': precipitation,
      'pressure': pressure,
      'condition': condition,
      'visibility': visibility,
      'uv_index': uvIndex,
      'timestamp': timestamp.toIso8601String(),
    };
  }
}
