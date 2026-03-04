class FishEntity {
  final String id;
  final String species;
  final double weight;
  final double length;
  final String healthStatus;
  final DateTime lastChecked;
  final Map<String, dynamic>? diseaseInfo;

  const FishEntity({
    required this.id,
    required this.species,
    required this.weight,
    required this.length,
    required this.healthStatus,
    required this.lastChecked,
    this.diseaseInfo,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is FishEntity &&
        other.id == id &&
        other.species == species &&
        other.weight == weight &&
        other.length == length &&
        other.healthStatus == healthStatus &&
        other.lastChecked == lastChecked;
  }

  @override
  int get hashCode {
    return Object.hash(id, species, weight, length, healthStatus, lastChecked);
  }

  @override
  String toString() {
    return 'FishEntity(id: $id, species: $species, healthStatus: $healthStatus)';
  }
}
