export interface IRange {
    readonly start: number;
    readonly end: number;
}
export declare class Range implements IRange {
    readonly start: number;
    readonly end: number;
    constructor(start: number, end: number);
    contains(value: number): boolean;
    intersectsRange(other: Range): boolean;
}
export declare function rangeContains(value: number, lower: number, upper: number): boolean;
export declare function rangeIntersect(firstLower: number, firstUpper: number, secondLower: number, secondUpper: number): boolean;
//# sourceMappingURL=Range.d.ts.map