class OptimizationEntity {
  final String id;
  final String type;
  final double currentValue;
  final double optimizedValue;
  final double savings;
  final List<OptimizationRecommendationEntity> recommendations;
  final DateTime generatedAt;
  final DateTime validUntil;

  const OptimizationEntity({
    required this.id,
    required this.type,
    required this.currentValue,
    required this.optimizedValue,
    required this.savings,
    required this.recommendations,
    required this.generatedAt,
    required this.validUntil,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is OptimizationEntity &&
        other.id == id &&
        other.type == type &&
        other.generatedAt == generatedAt;
  }

  @override
  int get hashCode {
    return Object.hash(id, type, generatedAt);
  }

  @override
  String toString() {
    return 'OptimizationEntity(id: $id, type: $type, savings: ${savings.toStringAsFixed(1)}%)';
  }
}

class OptimizationRecommendationEntity {
  final String action;
  final String description;
  final double potentialSavings;
  final String priority;
  final Map<String, dynamic> parameters;

  const OptimizationRecommendationEntity({
    required this.action,
    required this.description,
    required this.potentialSavings,
    required this.priority,
    required this.parameters,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is OptimizationRecommendationEntity &&
        other.action == action &&
        other.potentialSavings == potentialSavings;
  }

  @override
  int get hashCode {
    return Object.hash(action, potentialSavings);
  }
}
