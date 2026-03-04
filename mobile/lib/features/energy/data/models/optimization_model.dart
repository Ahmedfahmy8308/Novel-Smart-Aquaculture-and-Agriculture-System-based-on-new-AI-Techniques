class OptimizationModel {
  final String id;
  final String type; // usage, cost, carbon
  final double currentValue;
  final double optimizedValue;
  final double savings; // percentage
  final List<OptimizationRecommendation> recommendations;
  final DateTime generatedAt;
  final DateTime validUntil;

  const OptimizationModel({
    required this.id,
    required this.type,
    required this.currentValue,
    required this.optimizedValue,
    required this.savings,
    required this.recommendations,
    required this.generatedAt,
    required this.validUntil,
  });

  factory OptimizationModel.fromJson(Map<String, dynamic> json) {
    return OptimizationModel(
      id: json['id'] as String,
      type: json['type'] as String,
      currentValue: (json['current_value'] as num).toDouble(),
      optimizedValue: (json['optimized_value'] as num).toDouble(),
      savings: (json['savings'] as num).toDouble(),
      recommendations:
          (json['recommendations'] as List)
              .map((rec) => OptimizationRecommendation.fromJson(rec))
              .toList(),
      generatedAt: DateTime.parse(json['generated_at'] as String),
      validUntil: DateTime.parse(json['valid_until'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'type': type,
      'current_value': currentValue,
      'optimized_value': optimizedValue,
      'savings': savings,
      'recommendations': recommendations.map((r) => r.toJson()).toList(),
      'generated_at': generatedAt.toIso8601String(),
      'valid_until': validUntil.toIso8601String(),
    };
  }
}

class OptimizationRecommendation {
  final String action;
  final String description;
  final double potentialSavings;
  final String priority; // high, medium, low
  final Map<String, dynamic> parameters;

  const OptimizationRecommendation({
    required this.action,
    required this.description,
    required this.potentialSavings,
    required this.priority,
    required this.parameters,
  });

  factory OptimizationRecommendation.fromJson(Map<String, dynamic> json) {
    return OptimizationRecommendation(
      action: json['action'] as String,
      description: json['description'] as String,
      potentialSavings: (json['potential_savings'] as num).toDouble(),
      priority: json['priority'] as String,
      parameters: json['parameters'] as Map<String, dynamic>,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'action': action,
      'description': description,
      'potential_savings': potentialSavings,
      'priority': priority,
      'parameters': parameters,
    };
  }
}
