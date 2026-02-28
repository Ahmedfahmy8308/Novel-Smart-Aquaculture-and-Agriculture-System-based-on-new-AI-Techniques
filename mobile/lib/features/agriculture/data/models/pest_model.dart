class PestModel {
  final String id;
  final String name;
  final String type; // insect, fungal, bacterial, viral
  final String severity; // low, medium, high, critical
  final String description;
  final List<String> affectedCrops;
  final Map<String, dynamic> treatmentRecommendations;
  final DateTime identifiedDate;

  const PestModel({
    required this.id,
    required this.name,
    required this.type,
    required this.severity,
    required this.description,
    required this.affectedCrops,
    required this.treatmentRecommendations,
    required this.identifiedDate,
  });

  factory PestModel.fromJson(Map<String, dynamic> json) {
    return PestModel(
      id: json['id'] as String,
      name: json['name'] as String,
      type: json['type'] as String,
      severity: json['severity'] as String,
      description: json['description'] as String,
      affectedCrops: List<String>.from(json['affected_crops'] as List),
      treatmentRecommendations:
          json['treatment_recommendations'] as Map<String, dynamic>,
      identifiedDate: DateTime.parse(json['identified_date'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'type': type,
      'severity': severity,
      'description': description,
      'affected_crops': affectedCrops,
      'treatment_recommendations': treatmentRecommendations,
      'identified_date': identifiedDate.toIso8601String(),
    };
  }
}
