import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../config/api_config.dart';
import '../errors/exceptions.dart';

class ApiClient {
  static final ApiClient _instance = ApiClient._internal();
  factory ApiClient() => _instance;
  ApiClient._internal();

  final http.Client _client = http.Client();
  String? _authToken;

  void setAuthToken(String token) {
    _authToken = token;
  }

  void clearAuthToken() {
    _authToken = null;
  }

  Map<String, String> get _headers {
    final headers = Map<String, String>.from(ApiConfig.defaultHeaders);
    if (_authToken != null) {
      headers['Authorization'] = 'Bearer $_authToken';
    }
    return headers;
  }

  Future<Map<String, dynamic>> get(String endpoint, {String? baseUrl}) async {
    try {
      final url = Uri.parse('${baseUrl ?? ApiConfig.baseUrl}$endpoint');
      final response = await _client.get(url, headers: _headers);
      return _handleResponse(response);
    } on http.ClientException catch (e) {
      throw NetworkException('Network error: ${e.message}');
    } catch (e) {
      throw NetworkException('Unexpected network error: $e');
    }
  }

  Future<Map<String, dynamic>> post(
    String endpoint,
    Map<String, dynamic> data, {
    String? baseUrl,
  }) async {
    try {
      final url = Uri.parse('${baseUrl ?? ApiConfig.baseUrl}$endpoint');
      final response = await _client.post(
        url,
        headers: _headers,
        body: json.encode(data),
      );
      return _handleResponse(response);
    } on http.ClientException catch (e) {
      throw NetworkException('Network error: ${e.message}');
    } catch (e) {
      throw NetworkException('Unexpected network error: $e');
    }
  }

  Future<Map<String, dynamic>> put(
    String endpoint,
    Map<String, dynamic> data, {
    String? baseUrl,
  }) async {
    try {
      final url = Uri.parse('${baseUrl ?? ApiConfig.baseUrl}$endpoint');
      final response = await _client.put(
        url,
        headers: _headers,
        body: json.encode(data),
      );
      return _handleResponse(response);
    } on http.ClientException catch (e) {
      throw NetworkException('Network error: ${e.message}');
    } catch (e) {
      throw NetworkException('Unexpected network error: $e');
    }
  }

  Future<Map<String, dynamic>> delete(
    String endpoint, {
    String? baseUrl,
  }) async {
    try {
      final url = Uri.parse('${baseUrl ?? ApiConfig.baseUrl}$endpoint');
      final response = await _client.delete(url, headers: _headers);
      return _handleResponse(response);
    } on http.ClientException catch (e) {
      throw NetworkException('Network error: ${e.message}');
    } catch (e) {
      throw NetworkException('Unexpected network error: $e');
    }
  }

  Future<Map<String, dynamic>> uploadFile(
    String endpoint,
    String filePath, {
    String? baseUrl,
    String fieldName = 'file',
  }) async {
    try {
      final url = Uri.parse('${baseUrl ?? ApiConfig.baseUrl}$endpoint');
      final request = http.MultipartRequest('POST', url);

      request.headers.addAll(_headers);
      request.files.add(await http.MultipartFile.fromPath(fieldName, filePath));

      final streamedResponse = await request.send();
      final response = await http.Response.fromStream(streamedResponse);

      return _handleResponse(response);
    } on http.ClientException catch (e) {
      throw NetworkException('Upload error: ${e.message}');
    } catch (e) {
      throw NetworkException('Unexpected upload error: $e');
    }
  }

  Map<String, dynamic> _handleResponse(http.Response response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      try {
        return json.decode(response.body) as Map<String, dynamic>;
      } catch (e) {
        throw ServerException(
          'Invalid JSON response',
          statusCode: response.statusCode,
        );
      }
    } else if (response.statusCode == 401) {
      throw AuthException('Unauthorized access', code: '401');
    } else if (response.statusCode == 403) {
      throw AuthException('Access forbidden', code: '403');
    } else if (response.statusCode == 404) {
      throw ServerException(
        'Resource not found',
        statusCode: response.statusCode,
      );
    } else if (response.statusCode >= 500) {
      throw ServerException('Server error', statusCode: response.statusCode);
    } else {
      throw ServerException('Request failed', statusCode: response.statusCode);
    }
  }

  void dispose() {
    _client.close();
  }
}
