class CropModel {
  final String id;
  final String name;
  final String variety;
  final String healthStatus;
  final double area; // in hectares
  final DateTime plantedDate;
  final DateTime? harvestDate;
  final Map<String, dynamic>? diseaseInfo;
  final Map<String, dynamic>? yieldPrediction;

  const CropModel({
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

  factory CropModel.fromJson(Map<String, dynamic> json) {
    return CropModel(
      id: json['id'] as String,
      name: json['name'] as String,
      variety: json['variety'] as String,
      healthStatus: json['health_status'] as String,
      area: (json['area'] as num).toDouble(),
      plantedDate: DateTime.parse(json['planted_date'] as String),
      harvestDate:
          json['harvest_date'] != null
              ? DateTime.parse(json['harvest_date'] as String)
              : null,
      diseaseInfo: json['disease_info'] as Map<String, dynamic>?,
      yieldPrediction: json['yield_prediction'] as Map<String, dynamic>?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'variety': variety,
      'health_status': healthStatus,
      'area': area,
      'planted_date': plantedDate.toIso8601String(),
      'harvest_date': harvestDate?.toIso8601String(),
      'disease_info': diseaseInfo,
      'yield_prediction': yieldPrediction,
    };
  }

  CropModel copyWith({
    String? id,
    String? name,
    String? variety,
    String? healthStatus,
    double? area,
    DateTime? plantedDate,
    DateTime? harvestDate,
    Map<String, dynamic>? diseaseInfo,
    Map<String, dynamic>? yieldPrediction,
  }) {
    return CropModel(
      id: id ?? this.id,
      name: name ?? this.name,
      variety: variety ?? this.variety,
      healthStatus: healthStatus ?? this.healthStatus,
      area: area ?? this.area,
      plantedDate: plantedDate ?? this.plantedDate,
      harvestDate: harvestDate ?? this.harvestDate,
      diseaseInfo: diseaseInfo ?? this.diseaseInfo,
      yieldPrediction: yieldPrediction ?? this.yieldPrediction,
    );
  }
}
