class PestEntity {
  final String id;
  final String name;
  final String type;
  final String severity;
  final String description;
  final List<String> affectedCrops;
  final Map<String, dynamic> treatmentRecommendations;
  final DateTime identifiedDate;

  const PestEntity({
    required this.id,
    required this.name,
    required this.type,
    required this.severity,
    required this.description,
    required this.affectedCrops,
    required this.treatmentRecommendations,
    required this.identifiedDate,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is PestEntity &&
        other.id == id &&
        other.name == name &&
        other.type == type &&
        other.severity == severity;
  }

  @override
  int get hashCode {
    return Object.hash(id, name, type, severity);
  }

  @override
  String toString() {
    return 'PestEntity(id: $id, name: $name, type: $type, severity: $severity)';
  }
}
