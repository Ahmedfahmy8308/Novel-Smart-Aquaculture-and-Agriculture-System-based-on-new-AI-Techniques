import 'package:go_router/go_router.dart';
import '../../features/aquaculture/presentation/screens/disease_detection_screen.dart';
import '../../features/aquaculture/presentation/screens/growth_monitoring_screen.dart';
import '../../features/aquaculture/presentation/screens/feeding_management_screen.dart';
import '../../features/aquaculture/presentation/screens/harvest_tracking_screen.dart';
import '../../features/aquaculture/presentation/screens/fish_counting_screen.dart';
import '../../features/agriculture/presentation/screens/crop_health_screen.dart';
import '../../features/agriculture/presentation/screens/pest_management_screen.dart';
import '../../features/agriculture/presentation/screens/yield_prediction_screen.dart';
import '../../features/weather/presentation/screens/weather_forecast_screen.dart';
import '../../features/weather/presentation/screens/climate_analysis_screen.dart';
import '../../features/energy/presentation/screens/energy_monitoring_screen.dart';
import '../../features/energy/presentation/screens/optimization_screen.dart';
import '../../features/chatbot/presentation/screens/chat_screen.dart';
import '../../features/shared/presentation/screens/dashboard_screen.dart';
import '../../features/shared/presentation/screens/profile_screen.dart';
import '../../features/shared/presentation/screens/settings_screen.dart';
import '../../features/shared/presentation/screens/login_screen.dart';
import '../../features/shared/presentation/screens/signup_screen.dart';

class AppRouter {
  static final GoRouter router = GoRouter(
    initialLocation: '/login',
    routes: [
      // Authentication Routes
      GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
      GoRoute(
        path: '/signup',
        builder: (context, state) => const SignupScreen(),
      ),

      // Main Dashboard
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardScreen(),
      ),

      // Aquaculture Routes
      GoRoute(
        path: '/aquaculture/disease-detection',
        builder: (context, state) => const DiseaseDetectionScreen(),
      ),
      GoRoute(
        path: '/aquaculture/growth-monitoring',
        builder: (context, state) => const GrowthMonitoringScreen(),
      ),
      GoRoute(
        path: '/aquaculture/feeding-management',
        builder: (context, state) => const FeedingManagementScreen(),
      ),
      GoRoute(
        path: '/aquaculture/harvest-tracking',
        builder: (context, state) => const HarvestTrackingScreen(),
      ),
      GoRoute(
        path: '/aquaculture/fish-counting',
        builder: (context, state) => const FishCountingScreen(),
      ),

      // Agriculture Routes
      GoRoute(
        path: '/agriculture/crop-health',
        builder: (context, state) => const CropHealthScreen(),
      ),
      GoRoute(
        path: '/agriculture/pest-management',
        builder: (context, state) => const PestManagementScreen(),
      ),
      GoRoute(
        path: '/agriculture/yield-prediction',
        builder: (context, state) => const YieldPredictionScreen(),
      ),

      // Weather Routes
      GoRoute(
        path: '/weather/forecast',
        builder: (context, state) => const WeatherForecastScreen(),
      ),
      GoRoute(
        path: '/weather/climate-analysis',
        builder: (context, state) => const ClimateAnalysisScreen(),
      ),

      // Energy Routes
      GoRoute(
        path: '/energy/monitoring',
        builder: (context, state) => const EnergyMonitoringScreen(),
      ),
      GoRoute(
        path: '/energy/optimization',
        builder: (context, state) => const OptimizationScreen(),
      ),

      // Chatbot Route
      GoRoute(path: '/chat', builder: (context, state) => const ChatScreen()),

      // Profile & Settings
      GoRoute(
        path: '/profile',
        builder: (context, state) => const ProfileScreen(),
      ),
      GoRoute(
        path: '/settings',
        builder: (context, state) => const SettingsScreen(),
      ),
    ],
  );
}
