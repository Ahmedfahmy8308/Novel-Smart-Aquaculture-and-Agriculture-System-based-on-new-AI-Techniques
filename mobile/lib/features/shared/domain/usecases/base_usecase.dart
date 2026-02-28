abstract class UseCase<Type, Params> {
  Future<Type> call(Params params);
}

abstract class UseCaseNoParams<Type> {
  Future<Type> call();
}

class NoParams {
  const NoParams();

  @override
  bool operator ==(Object other) {
    return other is NoParams;
  }

  @override
  int get hashCode => 0;
}
