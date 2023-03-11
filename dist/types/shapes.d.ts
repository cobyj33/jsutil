import { IVector2 } from "./Vector2";
export declare const Supported2DShapes: readonly ["LINE", "ELLIPSE", "CIRCLE", "BOX", "SQUARE"];
export type LifeLikeAvailableShapes = typeof Supported2DShapes[number];
export type ShapeFunction = (start: IVector2, end: IVector2) => IVector2[];
export declare const getLine: ShapeFunction;
export declare const getEllipse: ShapeFunction;
export declare const getCircle: ShapeFunction;
export declare const getBox: ShapeFunction;
export declare const getSquare: ShapeFunction;
export declare const SHAPE_TO_SHAPE_FUNCTION: Readonly<{
    [key in LifeLikeAvailableShapes]: ShapeFunction;
}>;
export declare function getShapeFunction(shape: LifeLikeAvailableShapes): ShapeFunction;
//# sourceMappingURL=shapes.d.ts.map