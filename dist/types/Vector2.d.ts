export interface IVector2 {
    readonly row: number;
    readonly col: number;
}
export declare class Vector2 implements IVector2 {
    readonly row: number;
    readonly col: number;
    static readonly ZERO: Vector2;
    constructor(row: number, col: number);
    static fromData(vector: IVector2): Vector2;
    static fromDimension(width: number, height: number): Vector2;
    withRow(row: number | ((currentRow: number) => number)): Vector2;
    withCol(col: number | ((currentCol: number) => number)): Vector2;
    rowcomp(): Vector2;
    colcomp(): Vector2;
    isZero(): boolean;
    length(): number;
    angle(): number;
    floor(): Vector2;
    ceil(): Vector2;
    trunc(): Vector2;
    rotate(angle: number): Vector2;
    toLength(length: number): Vector2;
    scale(amount: number): Vector2;
    alterToCol(col: number): Vector2;
    alterToRow(row: number): Vector2;
    normalize(): Vector2;
    toString(): string;
    translate(row: number, col: number): Vector2;
    int(): Vector2;
    add(other: IVector2): Vector2;
    addcomp(row: number, col: number): Vector2;
    subtract(other: IVector2): Vector2;
    round(): Vector2;
    distance(other: IVector2): number;
    midpoint(other: IVector2): Vector2;
    angleBetween(other: IVector2): number;
    dot(other: IVector2): number;
    lerp(t: number, other: IVector2): Vector2;
    adjacent(): [Vector2, Vector2, Vector2, Vector2];
    equals(other: any): boolean;
    abs(): Vector2;
    min(): number;
    max(): number;
    clone(): Vector2;
    data(): IVector2;
}
export declare function adjacentVector2(vec: IVector2): [IVector2, IVector2, IVector2, IVector2];
export declare function getVectorLength(vector2: IVector2): number;
export declare function rotateVector2(vector: IVector2, angleInRadians: number): IVector2;
export declare function vector2ToLength(vector: IVector2, length: number): IVector2;
export declare function vector2ToAngle(vector: IVector2): number;
export declare function vector2AlterToCol(vector: IVector2, col: number): IVector2;
export declare function vector2AlterToRow(vector: IVector2, row: number): IVector2;
export declare function vector2Normalized(vector: IVector2): IVector2;
export declare function vector2ToString(vector: IVector2): string;
export declare function translateVector2(vector: IVector2, row: number, col: number): IVector2;
export declare function addVector2(vector: IVector2, other: IVector2): IVector2;
export declare function vector2Int(vector: IVector2): IVector2;
export declare function subtractVector2(vector: IVector2, other: IVector2): IVector2;
export declare function scaleVector2(vector: IVector2, scale: number): IVector2;
export declare function roundVector2(vector: IVector2): IVector2;
export declare function vector2FromAngle(angleInRadians: number): IVector2;
export declare function distanceBetweenVector2(first: IVector2, second: IVector2): number;
export declare function midPointBetweenVector2(first: IVector2, second: IVector2): IVector2;
export declare function angleBetweenVector2(first: IVector2, second: IVector2): number;
export declare function dotProductVector2(first: IVector2, second: IVector2): number;
export declare function vector2Equals(vector: IVector2, other: IVector2): boolean;
export declare function lerp(t: number, first: IVector2, second: IVector2): IVector2;
export declare function vector2IsInteger(vec: IVector2): boolean;
export declare function vector2Abs(vec: IVector2): IVector2;
/**
 * Returns all Vector2s which are duplicates in the inputted list
 * Note that the outputted list will still be unique. If a value appears multiple times in the inputted list, it will appear once in the outputted list
 *
 * @param list The list to be filtered
 * @returns A list of all Vector2 values found to be duplicates
 */
export declare function getVector2ListDuplicates(list: IVector2[]): IVector2[];
/**
 * Takes any Vector2 values that are duplicates from the list array and makes them appear only once
 * Note this means that if a value appears twice in the inputted list, it will appear ONCE in the outputted list
 * Does not edit in place
 *
 * @param list The list to be filtered
 * @returns A new list, which is the original list with only unique values
 */
export declare function filterVector2ListDuplicates(list: IVector2[]): IVector2[];
/**
 * Completely removes any Vector2 values that are duplicates from the list array
 * Note this means that if a value appears twice in the inputted list, it will NOT be present in the outputted list
 * Does not edit in place
 *
 * @param list The list to be filtered
 * @returns A new list, which is the original list with only ORIGINALLY unique values
 */
export declare function removeVector2ListDuplicates(list: IVector2[]): IVector2[];
/**
 * Keep any Vector2 values from the list array that match any values in the matches array
 * Does not edit in place
 *
 * @param list The list to be filtered
 * @param matches The values that will be tested as matches against the list
 * @returns A new list, which is the original list with only values that match any of the Vector2s in the matches parameter
 */
export declare function filterVector2ListMatches(list: IVector2[], matches: IVector2[]): IVector2[];
/**
 * Remove any Vector2 values from the list array that match any values in the matches array
 * Does not edit in place
 *
 * @param list The list to be filtered
 * @param matches The values that will be tested as matches against the list
 * @returns A **new** list, which is the original list without any values that match the Vector2s in the matches parameter
 */
export declare function removeVector2ListMatches(list: IVector2[], matches: IVector2[]): IVector2[];
//# sourceMappingURL=Vector2.d.ts.map