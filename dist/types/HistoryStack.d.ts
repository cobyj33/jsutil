export declare class HistoryStack<T> {
    private history;
    private index;
    private _maxLength;
    get maxLength(): number;
    set maxLength(request: number);
    get length(): number;
    get state(): T;
    get empty(): boolean;
    constructor();
    back(): void;
    canGoBack(): boolean;
    peekLatest(): T;
    peek(): T;
    forward(): void;
    canGoForward(): boolean;
    pushState(data: T): void;
}
//# sourceMappingURL=HistoryStack.d.ts.map