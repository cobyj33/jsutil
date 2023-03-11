type GenericType<T> = T;
type ReactDispatch<T> = (value: T) => T;
type ReactSetStateAction<T> = T | ((prevState: T) => T);
export interface StatefulData<T> extends GenericType<[T, ReactDispatch<ReactSetStateAction<T>>]> {
}
export {};
//# sourceMappingURL=util.d.ts.map