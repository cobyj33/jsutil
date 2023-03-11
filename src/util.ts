import { IDimension2D } from "./Dimension";

/**
 * Test if a matrix is rectangular or not
 * 
 * A matrix is considered rectangular if it's height is not 0, and all rows have the same amount of columns
 * 
 * @param matrix A matrix of a data type
 * @returns If the matrix is rectangular or not
 */
export function isRectangularMatrix<T>(matrix: T[][]): boolean {
    if (matrix.length === 0) return true;
    const width = matrix[0].length;

    for (let row = 0; row < matrix.length; row++) {
        if (matrix[row].length !== width) return false;
    }
    return true;
}

/**
 * Test if a matrix is rectangular or not
 * 
 * A matrix is considered rectangular if it's height is not 0, and all rows have the same amount of columns
 * 
 * @param matrix A matrix of a data type
 * @returns If the matrix is rectangular or not
 */
export function getRectangularMatrixDimensions<T>(matrix: T[][]): IDimension2D {
    if (isRectangularMatrix(matrix)) {
        return { width: matrix.length, height: matrix[0].length }
    }
    throw new Error("Attempted to get Rectangular Matrix dimensions of non-rectangular matrix " + matrix)
}

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

export function capitalized(word: string) {
    if (word.length === 0) {
        return word;
    }
    const firstLetter = word.charAt(0)
    return firstLetter.toUpperCase().concat( word.slice(1).toLowerCase() )
}

export function isError(e: any): e is Error {
    return typeof(e) === "object" && e !== null && "stack" in e && typeof(e.stack) === 'string' && "message" in e && typeof(e.message) === 'string';
}

export function isInBounds2D<T>(matrix: T[][], row: number, col: number) {
    if (matrix.length === 0) return false;
    return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}

export function flipObject<T extends { [key in string | number | symbol]: string | number | symbol}>(obj: T): { [key in T[keyof T]]: keyof T } {
    return Object.fromEntries(Object.entries(obj).map(entry => [entry[1], entry[0]])) as { [key in T[keyof T]]: keyof T }
}
