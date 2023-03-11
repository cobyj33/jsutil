export interface IDimension2D {
    readonly width: number;
    readonly height: number;
}
type Dimension2DTuple = [number, number];
export declare class Dimension2D implements IDimension2D {
    readonly width: number;
    readonly height: number;
    static readonly ZERO: Dimension2D;
    constructor(width: number, height: number);
    get area(): number;
    aspectRatio(): number;
    tuple(): Dimension2DTuple;
    static fromTuple(tuple: Dimension2DTuple): Dimension2D;
    static fromData(data: IDimension2D): Dimension2D;
    withWidth(width: number): Dimension2D;
    withHeight(height: number): Dimension2D;
    scale(factor: number): Dimension2D;
    expand(width: number, height: number): Dimension2D;
    subtract(other: Dimension2D): Dimension2D;
    trunc(): Dimension2D;
    floor(): Dimension2D;
    ceil(): Dimension2D;
    round(): Dimension2D;
    equals(other: Dimension2D): boolean;
}
export {};
//# sourceMappingURL=Dimension.d.ts.map