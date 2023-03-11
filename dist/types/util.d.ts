import { IDimension2D } from "./Dimension";
/**
 * Clamp a value in an interval [lower, higher], where if the number is lower than the clamp value, it will be fit to the lower value, and if the number is higher than the top clamp value, it will be fit to the highest value. If the value is in the interval [lower, higher], the value simply returns itself
 * @example clamp(4, 5, 10) => 5; clamp(20, 5, 10) => 10; clamp(7, 5, 10) => 7
 *
 * @param value {number} The number value to be clamped
 * @param bounds1 {number} One of the bounds for the number being clamped
 * @param bounds2 {number} One of the bounds for the number being clamped
 * @returns The number clamped
 */
export declare function clamp(value: number, bounds1: number, bounds2: number): number;
/**
 * Creates a sequence of numbers from lowest to highest counting by 1
 *
 * Similar to the "range" function found in Python
 *
 * It is not required for "first" to be less than "second"
 *
 * @param first The first bounds for the range
 * @param second The second bounds for the range
 * @returns An array counting from the lowest bounds to the highest bounds, incrementing by 1 each index
 */
export declare function range(first: number, second: number): number[];
/**
 * Test if a matrix is rectangular or not
 *
 * A matrix is considered rectangular if it's height is not 0, and all rows have the same amount of columns
 *
 * @param matrix A matrix of a data type
 * @returns If the matrix is rectangular or not
 */
export declare function isRectangularMatrix<T>(matrix: T[][]): boolean;
/**
 * Test if a matrix is rectangular or not
 *
 * A matrix is considered rectangular if it's height is not 0, and all rows have the same amount of columns
 *
 * @param matrix A matrix of a data type
 * @returns If the matrix is rectangular or not
 */
export declare function getRectangularMatrixDimensions<T>(matrix: T[][]): IDimension2D;
export declare function forEach2D<T>(matrix: T[][], callbackfn: (val: T, row: number, col: number) => void): void;
export declare function getArrayFrequencyMap<T>(array: T[]): Map<T, number>;
/**
 * Determines if two number arrays are the same
 *
 * Number arrays are considered the same if they have the same length and every data point at every index is the same
 *
 * @param first A number array
 * @param second Another number array
 * @returns Whether the two number arrays are considered equal according to the described conditions
 */
export declare function isEqualNumberArray(first: number[], second: number[]): boolean;
/**
 * Determines if two number arrays are similar according to if they have the same data points, although they may not be in the same order
 *
 * @param first A number array
 * @param second Another number array
 * @returns Whether the two number arrays are considered similar according to the described conditions
 */
export declare function isSimilarNumberArray(first: number[], second: number[]): boolean;
export declare function capitalized(word: string): string;
export declare function isError(e: any): e is Error;
export declare function isInBounds2D<T>(matrix: T[][], row: number, col: number): boolean;
export declare function flipObject<T extends {
    [key in string | number | symbol]: string | number | symbol;
}>(obj: T): {
    [key in T[keyof T]]: keyof T;
};
/**
 * Concatenates multiple Uint8ClampedArrays into one Uint8ClampedArray
 *
 * @param arrays A variable argument of Uint8ClampedArrays
 * @returns A concatenated Uint8ClampedArray of all inputted arrays
 */
export declare function concatUint8ClampedArrays(...arrays: Uint8ClampedArray[]): Uint8ClampedArray;
//# sourceMappingURL=util.d.ts.map