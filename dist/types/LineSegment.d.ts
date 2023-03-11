import { IVector2, Vector2 } from "./Vector2";
export declare class LineSegment implements ILineSegment {
    readonly start: Vector2;
    readonly end: Vector2;
    constructor(start: IVector2, end: IVector2);
    withEnd(end: IVector2): LineSegment;
    withStart(start: IVector2): LineSegment;
    static getCells(start: IVector2, end: IVector2): IVector2[];
    static from(rowStart: number, colStart: number, rowEnd: number, colEnd: number): LineSegment;
    cells(): IVector2[];
    length(): number;
    transform(callbackfn: (vec: Vector2) => Vector2): LineSegment;
}
export interface ILineSegment {
    start: IVector2;
    end: IVector2;
}
//# sourceMappingURL=LineSegment.d.ts.map