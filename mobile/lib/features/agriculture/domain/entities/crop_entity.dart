class CropEntity {
  final String id;
  final String name;
  final String variety;
  final String healthStatus;
  final double area;
  final DateTime plantedDate;
  final DateTime? harvestDate;
  final Map<String, dynamic>? diseaseInfo;
  final Map<String, dynamic>? yieldPrediction;

  const CropEntity({
    required this.id,
    required this.name,
    required this.variety,
    required this.healthStatus,
    required this.area,
    required this.plantedDate,
    this.harvestDate,
    this.diseaseInfo,
    this.yieldPrediction,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is CropEntity &&
        other.id == id &&
        other.name == name &&
        other.variety == variety &&
        other.healthStatus == healthStatus &&
        other.area == area &&
        other.plantedDate == plantedDate &&
        other.harvestDate == harvestDate;
  }

  @override
  int get hashCode {
    return Object.hash(
      id,
      name,
      variety,
      healthStatus,
      area,
      plantedDate,
      harvestDate,
    );
  }

  @override
  String toString() {
    return 'CropEntity(id: $id, name: $name, variety: $variety, healthStatus: $healthStatus)';
  }
}
