import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'core/network/api_client.dart';
import 'services/fish_service_api.dart';
import 'services/plant_service_api.dart';
import 'services/llm_service_api.dart';
import 'services/smart_ml_service_api.dart';

// Core Services
final apiClientProvider = Provider<ApiClient>((ref) => ApiClient());

// API Services
final fishServiceProvider = Provider<FishServiceApi>((ref) => FishServiceApi());
final plantServiceProvider = Provider<PlantServiceApi>(
  (ref) => PlantServiceApi(),
);
final llmServiceProvider = Provider<LlmServiceApi>((ref) => LlmServiceApi());
final smartMlServiceProvider = Provider<SmartMlServiceApi>(
  (ref) => SmartMlServiceApi(),
);

// Auth State
final authStateProvider = StateNotifierProvider<AuthNotifier, AsyncValue<bool>>(
  (ref) {
    return AuthNotifier(ref.watch(apiClientProvider));
  },
);

class AuthNotifier extends StateNotifier<AsyncValue<bool>> {
  final ApiClient _apiClient;

  AuthNotifier(this._apiClient) : super(const AsyncValue.data(false));

  Future<void> login(String email, String password) async {
    // Temporary mock login while API is not ready: allow navigation when
    // email and password are present. Replace with real API call once backend
    // is available.
    state = const AsyncValue.loading();
    try {
      await Future.delayed(const Duration(milliseconds: 300));

      final hasBasicCreds = email.trim().isNotEmpty && password.isNotEmpty;
      if (!hasBasicCreds) {
        throw 'Please enter email and password';
      }

      state = const AsyncValue.data(true);
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }

  Future<void> logout() async {
    _apiClient.clearAuthToken();
    state = const AsyncValue.data(false);
  }
}
