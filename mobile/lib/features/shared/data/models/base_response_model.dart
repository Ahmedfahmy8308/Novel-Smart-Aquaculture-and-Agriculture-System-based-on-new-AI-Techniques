class BaseResponseModel<T> {
  final bool success;
  final T? data;
  final String? message;
  final String? errorCode;
  final Map<String, dynamic>? metadata;
  final DateTime timestamp;

  const BaseResponseModel({
    required this.success,
    this.data,
    this.message,
    this.errorCode,
    this.metadata,
    required this.timestamp,
  });

  factory BaseResponseModel.fromJson(
    Map<String, dynamic> json,
    T Function(dynamic)? fromJsonT,
  ) {
    return BaseResponseModel(
      success: json['success'] as bool,
      data:
          json['data'] != null && fromJsonT != null
              ? fromJsonT(json['data'])
              : json['data'] as T?,
      message: json['message'] as String?,
      errorCode: json['error_code'] as String?,
      metadata: json['metadata'] as Map<String, dynamic>?,
      timestamp: DateTime.parse(json['timestamp'] as String),
    );
  }

  Map<String, dynamic> toJson(Object? Function(T?)? toJsonT) {
    return {
      'success': success,
      'data': data != null && toJsonT != null ? toJsonT(data) : data,
      'message': message,
      'error_code': errorCode,
      'metadata': metadata,
      'timestamp': timestamp.toIso8601String(),
    };
  }

  BaseResponseModel<T> copyWith({
    bool? success,
    T? data,
    String? message,
    String? errorCode,
    Map<String, dynamic>? metadata,
    DateTime? timestamp,
  }) {
    return BaseResponseModel(
      success: success ?? this.success,
      data: data ?? this.data,
      message: message ?? this.message,
      errorCode: errorCode ?? this.errorCode,
      metadata: metadata ?? this.metadata,
      timestamp: timestamp ?? this.timestamp,
    );
  }
}
