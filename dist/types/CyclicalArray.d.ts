export declare class CyclicalArray<T> {
    private readonly array;
    currentIndex: number;
    constructor(array: Array<T>);
    peekBack(): T;
    back(): T;
    peekForward(): T;
    forward(): T;
}
//# sourceMappingURL=CyclicalArray.d.ts.map