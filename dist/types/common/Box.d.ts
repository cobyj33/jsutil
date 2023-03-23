import { IVector2, Vector2 } from "./Vector2";
import { Dimension2D, IDimension2D } from "./Dimension";
import { LineSegment } from "./LineSegment";
export interface IBox {
    readonly topleft: IVector2;
    readonly size: IDimension2D;
}
export declare class Box implements IBox {
    readonly topleft: Vector2;
    readonly size: Dimension2D;
    static readonly ZERO: IBox;
    static readonly MAX: IBox;
    constructor(topleft: IVector2, size: IDimension2D);
    static from(row: number, col: number, width: number, height: number): Box;
    static fromData(box: IBox): Box;
    static enclosed(points: IVector2[]): Box;
    get row(): number;
    get col(): number;
    get width(): number;
    get height(): number;
    get area(): number;
    get right(): number;
    get left(): number;
    get top(): number;
    get bottom(): number;
    get centerrow(): number;
    get centercol(): number;
    get center(): Vector2;
    get bottomright(): Vector2;
    get topright(): Vector2;
    get bottomleft(): Vector2;
    translate(vector: IVector2): Box;
    setCenter(vector: IVector2): Box;
    pad(width: number, height: number): Box;
    expand(width: number, height: number): Box;
    pointInside(vec: IVector2): boolean;
    corners(): [Vector2, Vector2, Vector2, Vector2];
    trunc(): Box;
    floor(): Box;
    ceil(): Box;
    round(): Box;
    lines(): [LineSegment, LineSegment, LineSegment, LineSegment];
    cells(): IVector2[];
    boxIntersect(other: Box): boolean;
    intersectingArea(other: Box): Box;
    toString(): string;
    equals(other: Box): Boolean;
}
//# sourceMappingURL=Box.d.ts.map