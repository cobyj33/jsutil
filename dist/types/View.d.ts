import { IVector2, Vector2 } from "./Vector2";
export interface IView {
    readonly position: IVector2;
    readonly cellSize: number;
}
export declare class View implements IView {
    readonly position: Vector2;
    readonly cellSize: number;
    constructor(position: IVector2, cellSize: number);
    get row(): number;
    get col(): number;
    static fromIView(view: IView): View;
    static from(row: number, col: number, cellSize: number): View;
    withPosition(value: IVector2 | ((vec: Vector2) => IVector2)): View;
    withCellSize(value: number | ((curr: number) => number)): View;
    offset(): Vector2;
    clone(): View;
    equals(other: View): boolean;
}
export declare function getViewOffset(view: IView): IVector2;
//# sourceMappingURL=View.d.ts.map