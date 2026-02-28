class PaginationEntity<T> {
  final List<T> items;
  final int currentPage;
  final int totalPages;
  final int totalItems;
  final int itemsPerPage;
  final bool hasNextPage;
  final bool hasPreviousPage;

  const PaginationEntity({
    required this.items,
    required this.currentPage,
    required this.totalPages,
    required this.totalItems,
    required this.itemsPerPage,
    required this.hasNextPage,
    required this.hasPreviousPage,
  });

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is PaginationEntity &&
        other.currentPage == currentPage &&
        other.totalPages == totalPages &&
        other.totalItems == totalItems;
  }

  @override
  int get hashCode {
    return Object.hash(currentPage, totalPages, totalItems);
  }

  @override
  String toString() {
    return 'PaginationEntity(page: $currentPage/$totalPages, items: ${items.length}/$totalItems)';
  }

  bool get isEmpty => items.isEmpty;
  bool get isNotEmpty => items.isNotEmpty;
  int get itemCount => items.length;
}
