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
    state = const AsyncValue.loading();
    try {
      final result = await _apiClient.post('/auth/login', {
        'email': email,
        'password': password,
      });

      if (result['token'] != null) {
        _apiClient.setAuthToken(result['token']);
        state = const AsyncValue.data(true);
      } else {
        state = AsyncValue.error('Login failed', StackTrace.current);
      }
    } catch (e, stack) {
      state = AsyncValue.error(e, stack);
    }
  }

  Future<void> logout() async {
    _apiClient.clearAuthToken();
    state = const AsyncValue.data(false);
  }
}
