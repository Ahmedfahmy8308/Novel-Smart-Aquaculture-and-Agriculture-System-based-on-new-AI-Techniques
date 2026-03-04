class AppConstants {
  // App Info
  static const String appName = 'AgriMind';
  static const String appVersion = '1.0.0';

  // Authentication Endpoints
  static const String loginEndpoint = '/auth/login';
  static const String signupEndpoint = '/auth/signup';
  static const String logoutEndpoint = '/auth/logout';
  static const String userProfileEndpoint = '/auth/profile';
  static const String updateProfileEndpoint = '/auth/profile/update';
  static const String changePasswordEndpoint = '/auth/change-password';

  // Feature Endpoints
  static const String fishDiseaseEndpoint = '/ai/aquaculture/disease-detection';
  static const String fishGrowthEndpoint = '/ai/aquaculture/growth-analysis';
  static const String fishCountingEndpoint = '/ai/aquaculture/fish-counting';
  static const String cropHealthEndpoint = '/ai/agriculture/crop-health';
  static const String plantDiseaseEndpoint = '/ai/agriculture/plant-disease';
  static const String pricePredictionEndpoint = '/ai/market/price-prediction';
  static const String yieldEstimationEndpoint = '/ai/market/yield-estimation';
  static const String weatherEndpoint = '/data/weather';
  static const String waterQualityEndpoint = '/data/water-quality';
  static const String chatbotEndpoint = '/ai/chatbot';

  // Data Endpoints
  static const String feedingScheduleEndpoint = '/data/feeding-schedule';
  static const String harvestRecordEndpoint = '/data/harvest';
  static const String growthDataEndpoint = '/data/growth';
  static const String notificationsEndpoint = '/notifications';
  static const String uploadImageEndpoint = '/upload/image';

  // App Configuration
  static const int requestTimeout = 30;
  static const int maxImageSize = 5 * 1024 * 1024; // 5MB
  static const List<String> supportedImageFormats = [
    'jpg',
    'jpeg',
    'png',
    'webp',
  ];
  static const int defaultPageSize = 20;
  static const Duration cacheTimeout = Duration(hours: 1);

  // Error Messages
  static const String networkError =
      'Network connection error. Please check your internet connection.';
  static const String serverError = 'Server error. Please try again later.';
  static const String timeoutError = 'Request timeout. Please try again.';
  static const String authError = 'Authentication failed. Please login again.';

  // Success Messages
  static const String loginSuccess = 'Login successful';
  static const String updateSuccess = 'Updated successfully';
  static const String uploadSuccess = 'Upload completed successfully';
}
