abstract class BaseEntity {
  final String id;
  final DateTime createdAt;
  final DateTime updatedAt;

  const BaseEntity({
    required this.id,
    required this.createdAt,
    required this.updatedAt,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is BaseEntity && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return '$runtimeType(id: $id)';
  }
}
