class ApiConfig {
  // Base URLs
  static const String baseUrl = 'https://api.Agromind.com';
  static const String plantServiceUrl = 'https://plant-api.Agromind.com';
  static const String fishServiceUrl = 'https://fish-api.Agromind.com';
  static const String llmServiceUrl = 'https://llm-api.Agromind.com';
  static const String smartMlServiceUrl = 'https://ml-api.Agromind.com';

  // API Versions
  static const String apiVersion = 'v1';

  // Timeouts
  static const int connectTimeout = 30000; // 30 seconds
  static const int receiveTimeout = 30000; // 30 seconds
  static const int sendTimeout = 30000; // 30 seconds

  // Retry Configuration
  static const int maxRetries = 3;
  static const int retryDelay = 1000; // 1 second

  // Headers
  static const Map<String, String> defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // API Keys (Note: In production, load from secure storage)
  static const String weatherApiKey = 'YOUR_WEATHER_API_KEY';
  static const String mapsApiKey = 'YOUR_MAPS_API_KEY';
}
