class EnergyUsageEntity {
  final String id;
  final String deviceId;
  final String deviceName;
  final double consumption;
  final double cost;
  final DateTime timestamp;
  final String category;
  final Map<String, dynamic> metadata;

  const EnergyUsageEntity({
    required this.id,
    required this.deviceId,
    required this.deviceName,
    required this.consumption,
    required this.cost,
    required this.timestamp,
    required this.category,
    required this.metadata,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is EnergyUsageEntity &&
        other.id == id &&
        other.deviceId == deviceId &&
        other.timestamp == timestamp;
  }

  @override
  int get hashCode {
    return Object.hash(id, deviceId, timestamp);
  }

  @override
  String toString() {
    return 'EnergyUsageEntity(id: $id, device: $deviceName, consumption: ${consumption}kWh)';
  }
}
