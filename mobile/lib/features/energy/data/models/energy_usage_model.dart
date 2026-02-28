class EnergyUsageModel {
  final String id;
  final String deviceId;
  final String deviceName;
  final double consumption; // kWh
  final double cost;
  final DateTime timestamp;
  final String category; // irrigation, lighting, ventilation, etc.
  final Map<String, dynamic> metadata;

  const EnergyUsageModel({
    required this.id,
    required this.deviceId,
    required this.deviceName,
    required this.consumption,
    required this.cost,
    required this.timestamp,
    required this.category,
    required this.metadata,
  });

  factory EnergyUsageModel.fromJson(Map<String, dynamic> json) {
    return EnergyUsageModel(
      id: json['id'] as String,
      deviceId: json['device_id'] as String,
      deviceName: json['device_name'] as String,
      consumption: (json['consumption'] as num).toDouble(),
      cost: (json['cost'] as num).toDouble(),
      timestamp: DateTime.parse(json['timestamp'] as String),
      category: json['category'] as String,
      metadata: json['metadata'] as Map<String, dynamic>,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'device_id': deviceId,
      'device_name': deviceName,
      'consumption': consumption,
      'cost': cost,
      'timestamp': timestamp.toIso8601String(),
      'category': category,
      'metadata': metadata,
    };
  }
}
