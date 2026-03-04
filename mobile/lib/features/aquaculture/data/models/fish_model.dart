class FishModel {
  final String id;
  final String species;
  final double weight;
  final double length;
  final String healthStatus;
  final DateTime lastChecked;
  final Map<String, dynamic>? diseaseInfo;

  const FishModel({
    required this.id,
    required this.species,
    required this.weight,
    required this.length,
    required this.healthStatus,
    required this.lastChecked,
    this.diseaseInfo,
  });

  factory FishModel.fromJson(Map<String, dynamic> json) {
    return FishModel(
      id: json['id'] as String,
      species: json['species'] as String,
      weight: (json['weight'] as num).toDouble(),
      length: (json['length'] as num).toDouble(),
      healthStatus: json['health_status'] as String,
      lastChecked: DateTime.parse(json['last_checked'] as String),
      diseaseInfo: json['disease_info'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'species': species,
      'weight': weight,
      'length': length,
      'health_status': healthStatus,
      'last_checked': lastChecked.toIso8601String(),
      'disease_info': diseaseInfo,
    };
  }

  FishModel copyWith({
    String? id,
    String? species,
    double? weight,
    double? length,
    String? healthStatus,
    DateTime? lastChecked,
    Map<String, dynamic>? diseaseInfo,
  }) {
    return FishModel(
      id: id ?? this.id,
      species: species ?? this.species,
      weight: weight ?? this.weight,
      length: length ?? this.length,
      healthStatus: healthStatus ?? this.healthStatus,
      lastChecked: lastChecked ?? this.lastChecked,
      diseaseInfo: diseaseInfo ?? this.diseaseInfo,
    );
  }
}
