class AppException implements Exception {
  final String message;
  final String? code;

  const AppException(this.message, {this.code});

  @override
  String toString() =>
      'AppException: $message${code != null ? ' (Code: $code)' : ''}';
}

class NetworkException extends AppException {
  const NetworkException(super.message, {super.code});
}

class ServerException extends AppException {
  final int? statusCode;

  const ServerException(super.message, {this.statusCode, super.code});

  @override
  String toString() =>
      'ServerException: $message${statusCode != null ? ' (Status: $statusCode)' : ''}${code != null ? ' (Code: $code)' : ''}';
}

class AuthException extends AppException {
  const AuthException(super.message, {super.code});
}

class ValidationException extends AppException {
  final Map<String, String>? fieldErrors;

  const ValidationException(super.message, {this.fieldErrors, super.code});
}

class CacheException extends AppException {
  const CacheException(super.message, {super.code});
}

class TimeoutException extends AppException {
  const TimeoutException(super.message, {super.code});
}
