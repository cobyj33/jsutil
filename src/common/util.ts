import { IDimension2D } from "./Dimension2D";

/**
 * A utility class to change all values in an object to have a possible "null" value.
 */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

/**
 * Generic duplicate removal function
 * Not ideal for performance, but still works in almost all cases
 * 
 * Works internally by using JSON.stringify as a "hash" function to store the data in a list
 * This function should work with strings, numbers, booleans, nulls, or objects
 * This function will not work properly with classes, callbacks, or objects with classes or callbacks nested as values
 * 
 * @param list A List of values corresponding toward
 * @returns A list with removed duplicates
 */
export function removeDuplicatesGeneric<T extends object | string | number | boolean | null>(list: T[]): T[] {
    const tracker = new Set<string>()

    return list.filter(val => {
        const stringified: string = JSON.stringify(val);
        if (tracker.has(stringified)) {
            return false;
        } else {
            tracker.add(stringified)
            return true
        }
    })
}

/**
 * Generic duplicate detection function
 * Detects if an inputted list has any duplicate values at all
 * Not ideal for performance, but still works in almost all cases 
 * 
 * Works internally by using JSON.stringify as a "hash" function to store the data in a list
 * This function should work with strings, numbers, booleans, nulls, or objects
 * This function will not work properly with classes, callbacks, or objects with classes or callbacks nested as values
 * 
 * @param list A List of anything (objects, numbers, strings, booleans) except callback functions 
 * @returns Whether any duplicate could be found or not
 */
export function hasDuplicatesGeneric<T extends object | string | number | boolean | null>(list: T[]): boolean {
    const tracker = new Set<string>([])

    for (let i = 0; i < list.length; i++) {
        const stringified: string = JSON.stringify(list[i]);
        if (tracker.has(stringified)) {
            return true;
        } else {
            tracker.add(stringified)
        }
    }
    return false;
}

/**
 * Clamp a value in an interval [lower, higher], where if the number is lower than the clamp value, it will be fit to the lower value, and if the number is higher than the top clamp value, it will be fit to the highest value. If the value is in the interval [lower, higher], the value simply returns itself
 * @example clamp(4, 5, 10) => 5; clamp(20, 5, 10) => 10; clamp(7, 5, 10) => 7
 * 
 * @param value {number} The number value to be clamped
 * @param bounds1 {number} One of the bounds for the number being clamped
 * @param bounds2 {number} One of the bounds for the number being clamped
 * @returns The number clamped
 */
export function clamp(value: number, bounds1: number, bounds2: number) {
    const higher = Math.max(bounds1, bounds2)
    const lower = Math.min(bounds1, bounds2);
    
    return Math.min(higher, Math.max(lower, value))
}

/**
 * Creates a sequence of numbers from lowest to highest counting by 1
 * Similar to the "range" function found in Python
 * 
 * @note It is not required for "first" to be less than "second"
 * 
 * @param first The first bounds for the range
 * @param second The second bounds for the range
 * @returns An array counting from the lowest bounds to the highest bounds, incrementing by 1 each index
 */
export function range(first: number, second: number): number[] {
    const min: number = Math.min(first, second);
    const distance: number = Math.abs(first - second);
    return Array.from({length: distance}, (val, index) => index + min);
}


/**
 * @brief Test if a matrix is rectangular, where a matrix is considered rectangular if all rows have the same amount of columns
 * 
 * @note It is REQUIRED for isRectangularMatrix to return true while the number of rows in the matrix is 0.
 * @param matrix An array of arrays
 * @returns If the provided matrix is rectangular or not given 
 */
export function isRectangularMatrix(matrix: unknown[][]): boolean {
    if (matrix.length === 0) return true;
    const width = matrix[0].length;

    for (let row = 0; row < matrix.length; row++) {
        if (matrix[row].length !== width) return false;
    }
    return true;
}

/**
 * @brief Get the dimensions of a given rectangular matrix, where a matrix is considered rectangular if all rows have the same amount of columns
 * 
 * @param matrix An array of arrays
 * 
 * @returns The dimensions of the rectangular matrix as an IDimension2D in the format ( { width: number, height: number } )
 * 
 * @throws If the provided matrix is not considered rectangular according to the above identifiers, an error is thrown. 
 * Instead, the caller should first check if the given matrix is rectangular using isRectangularMatrix. 
 * This ensures that any runtime errors or undesired behaviors are accounted for on the caller's part
 */
export function getRectangularMatrixDimensions<T>(matrix: T[][]): IDimension2D {
    if (isRectangularMatrix(matrix)) {
        return { width: matrix.length, height: matrix[0].length }
    }
    throw new Error("Attempted to get Rectangular Matrix dimensions of non-rectangular matrix " + matrix)
}

/**
 * 
 * @param matrix 
 * @param callbackfn 
 */
export function forEach2D<T>(matrix: T[][], callbackfn: (val: T, row: number, col: number) => void) {
    matrix.forEach((rowArray, row) => rowArray.forEach((value, col) => callbackfn(value, row, col)))
}


export function getArrayFrequencyMap<T>(array: T[]): Map<T, number> {
    const map = new Map<T, number>()
    array.forEach(value => {
        const occurrances = map.get(value)
        if (occurrances !== null && occurrances !== undefined) {
            map.set(value, occurrances + 1)
        } else {
            map.set(value, 1)
        }
    })
    return map;
}

function areEqualNumberFrequencyMaps(first: Map<number, number>, second: Map<number, number>) {
    if (first.keys.length !== second.keys.length) {
        return false;
    }

    const firstIter = Array.from(first.entries())
    for (let [key, value] of firstIter) {
        if (second.get(key) === null || second.get(key) === undefined) {
            return false
        }

        if (second.get(key) !== first.get(key)) {
            return false
        }
    }

    const secondIter = Array.from(second.entries())
    for (let [key, value] of secondIter) {

        if (first.get(key) === null || first.get(key) === undefined) {
            return false
        }

        if (first.get(key) !== second.get(key)) {
            return false
        }
    }
    return true
}

/**
 * Determines if two number arrays are the same
 * 
 * Number arrays are considered the same if they have the same length and every data point at every index is the same
 * 
 * @param first A number array
 * @param second Another number array
 * @returns Whether the two number arrays are considered equal according to the described conditions
 */
export function isEqualNumberArray(first: number[], second: number[]) {
    if (first.length !== second.length) {
        return false;
    }
    const length = first.length

    for (let i = 0; i < length; i++) {
        if (first[i] !== second[i]) {
            return false;
        }
    }
    return true;
}

/**
 * @brief Determines if two number matrices are equal to each other
 * 
 * Two number matrices are considered equal if they have the same amount of rows, the same amount of columns in each row, and each data point is equal and in the same index
 * 
 * @param first A number matrix to compare
 * @param second A number matrix to compare
 * @returns The equality of the two matrices according to the described conditions above
 */
export function isEqualNumberMatrix(first: number[][], second: number[][]): boolean {
    if (first.length !== second.length) {
        return false;
    }

    for (let row = 0; row < first.length; row++) {
        if (first[row].length !== second[row].length) {
            return false;
        } 

        for (let col = 0; col < first.length; col++) {
            if (first[row][col] !== second[row][col]) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Determines if two number arrays are similar according to if they have the same data points, although they may not be in the same order
 * 
 * @param first A number array
 * @param second Another number array
 * @returns Whether the two number arrays are considered similar according to the described conditions
 */
export function isSimilarNumberArray(first: number[], second: number[]) {
    if (first.length !== second.length) {
        return false
    }
    
    const firstFreqMap = getArrayFrequencyMap(first)
    const secondFreqMap = getArrayFrequencyMap(second)
    return areEqualNumberFrequencyMaps(firstFreqMap, secondFreqMap);
}

/**
 * @brief Capitalize an inputted word
 * 
 * The string should only contain the inputted word, with the first index as the beginning of the word and the last index as the end of the word
 * 
 * @param word A string that contains a word
 * @returns The capitalized version of the word
 */
export function capitalized(word: string) {
    if (word.length === 0) {
        return word;
    }
    const firstLetter = word.charAt(0)
    return firstLetter.toUpperCase().concat( word.slice(1).toLowerCase() )
}

/**
 * @brief Determine if an unknown object is an Error object
 * 
 * @param e The unknown object to test 
 * @returns if the given object is an Error object
 */
export function isError(e: unknown): e is Error {
    return typeof(e) === "object" && e !== null && "stack" in e && typeof(e.stack) === 'string' && "message" in e && typeof(e.message) === 'string';
}

/**
 * @brief Returns a error message from an unknown object
 * 
 * This function is especially useful in a catch block of a try { ... } catch (e) { ... } statement, as the returned error is not guaranteed to be a specific type
 * 
 * Instead, this function can be used to extract the message of the returned thrown error if it is either an Error object, a string, or some form of data type with a .toString function (which includes objects, numbers, and booleans)
 * 
 * However, if the object cannot be returned as a string representation, an empty string is returned
 * 
 * @note PSA: When writing thrown errors, please still throw Error objects, as they are supported everywhere and made for the cause
 * 
 * @param e The unknown object to retrieve/create an Error Message from
 * @returns The given message of the provided error object, or an empty string if no message could be created
 */
export function getErrorMessage(e: unknown): string {
    if (isError(e)) {
        return e.message;
    } else if (typeof(e) === "string") {
        return e;
    } else if (typeof(e) === "object" && e !== null && "toString" in e) {
        return e.toString();
    } else if (typeof(e) === "number" || typeof(e) === "boolean") {
        return e.toString()
    }

    return ""
}

/**
 * @brief Find if a given (row, col) coordinate is in bounds of a matrix
 * 
 * @param matrix The matrix to test the inputted coordinates against
 * @param row The row position to test
 * @param col The column position to test
 * @returns If the provided row and column are in bounds of the provided matrix
 */
export function isInBounds2D(matrix: unknown[][], row: number, col: number) {
    if (matrix.length === 0) return false;
    return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}

/**
 * @brief A utility function to flip an object's keys and values
 * 
 * 
 * @param obj The object to flip the keys and values of
 * @returns A new object which has the keys of "obj" and values of "obj" flip-flopped 
 */
export function flipObject<T extends { [key in string | number | symbol]: string | number | symbol}>(obj: T): { [key in T[keyof T]]: keyof T } {
    return Object.fromEntries(Object.entries(obj).map(entry => [entry[1], entry[0]])) as { [key in T[keyof T]]: keyof T }
}

/**
 * Concatenates multiple Uint8ClampedArrays into one Uint8ClampedArray
 * 
 * @param arrays A variable argument of Uint8ClampedArrays
 * @returns A concatenated Uint8ClampedArray of all inputted arrays
 */
export function concatUint8ClampedArrays(...arrays: Uint8ClampedArray[]): Uint8ClampedArray {
    const totalLength = arrays.reduce((prev, curr) => prev + curr.length, 0)
    const newArray = new Uint8ClampedArray(totalLength)

    let stepLoc = 0;
    for (let i = 0; i < arrays.length; i++) {
        newArray.set(arrays[i], stepLoc)
        stepLoc += arrays[i].length
    }
    return newArray
}

/**
 * @brief Find if the given number can represent an unsigned 8-bit integer
 * 
 * @note Restrictions of an unsigned 8-bit integer: Must be an integer value between 0 and 255 inclusive
 * 
 * @param num The number to test as a unsigned 8-bit integer
 * @returns Whether the given number can represent an unsigned 8-bit integer
 */
export function isUint8(num: number): boolean {
    return Number.isInteger(num) && num >= 0 && num < 256
}