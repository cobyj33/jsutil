"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatUint8ClampedArrays = exports.flipObject = exports.isInBounds2D = exports.isError = exports.capitalized = exports.isSimilarNumberArray = exports.isEqualNumberArray = exports.getArrayFrequencyMap = exports.forEach2D = exports.getRectangularMatrixDimensions = exports.isRectangularMatrix = exports.range = exports.clamp = exports.hasDuplicatesGeneric = exports.removeDuplicatesGeneric = void 0;
/**
 * Generic duplicate removal function
 * Not ideal for performance, but still works in almost all cases
 * @param list A List of anything (objects, numbers, strings, booleans) except callback functions
 * @returns A list with removed duplicates
 */
function removeDuplicatesGeneric(list) {
    const tracker = new Set();
    return list.filter(val => {
        const stringified = JSON.stringify(val);
        if (tracker.has(stringified)) {
            return false;
        }
        else {
            tracker.add(stringified);
            return true;
        }
    });
}
exports.removeDuplicatesGeneric = removeDuplicatesGeneric;
/**
 * Generic duplicate detection function
 * Not ideal for performance, but still works in almost all cases
 * @param list A List of anything (objects, numbers, strings, booleans) except callback functions
 * @returns Whether any duplicate could be found or not
 */
function hasDuplicatesGeneric(list) {
    const tracker = new Set([]);
    for (let i = 0; i < list.length; i++) {
        const stringified = JSON.stringify(list[i]);
        if (tracker.has(stringified)) {
            return true;
        }
        else {
            tracker.add(stringified);
        }
    }
    return false;
}
exports.hasDuplicatesGeneric = hasDuplicatesGeneric;
/**
 * Clamp a value in an interval [lower, higher], where if the number is lower than the clamp value, it will be fit to the lower value, and if the number is higher than the top clamp value, it will be fit to the highest value. If the value is in the interval [lower, higher], the value simply returns itself
 * @example clamp(4, 5, 10) => 5; clamp(20, 5, 10) => 10; clamp(7, 5, 10) => 7
 *
 * @param value {number} The number value to be clamped
 * @param bounds1 {number} One of the bounds for the number being clamped
 * @param bounds2 {number} One of the bounds for the number being clamped
 * @returns The number clamped
 */
function clamp(value, bounds1, bounds2) {
    const higher = Math.max(bounds1, bounds2);
    const lower = Math.min(bounds1, bounds2);
    return Math.min(higher, Math.max(lower, value));
}
exports.clamp = clamp;
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
function range(first, second) {
    const min = Math.min(first, second);
    const distance = Math.abs(first - second);
    return Array.from({ length: distance }, (val, index) => index + min);
}
exports.range = range;
/**
 * Test if a matrix is rectangular or not
 *
 * A matrix is considered rectangular if it's height is not 0, and all rows have the same amount of columns
 *
 * @param matrix A matrix of a data type
 * @returns If the matrix is rectangular or not
 */
function isRectangularMatrix(matrix) {
    if (matrix.length === 0)
        return true;
    const width = matrix[0].length;
    for (let row = 0; row < matrix.length; row++) {
        if (matrix[row].length !== width)
            return false;
    }
    return true;
}
exports.isRectangularMatrix = isRectangularMatrix;
/**
 * Test if a matrix is rectangular or not
 *
 * A matrix is considered rectangular if it's height is not 0, and all rows have the same amount of columns
 *
 * @param matrix A matrix of a data type
 * @returns If the matrix is rectangular or not
 */
function getRectangularMatrixDimensions(matrix) {
    if (isRectangularMatrix(matrix)) {
        return { width: matrix.length, height: matrix[0].length };
    }
    throw new Error("Attempted to get Rectangular Matrix dimensions of non-rectangular matrix " + matrix);
}
exports.getRectangularMatrixDimensions = getRectangularMatrixDimensions;
function forEach2D(matrix, callbackfn) {
    matrix.forEach((rowArray, row) => rowArray.forEach((value, col) => callbackfn(value, row, col)));
}
exports.forEach2D = forEach2D;
function getArrayFrequencyMap(array) {
    const map = new Map();
    array.forEach(value => {
        const occurrances = map.get(value);
        if (occurrances !== null && occurrances !== undefined) {
            map.set(value, occurrances + 1);
        }
        else {
            map.set(value, 1);
        }
    });
    return map;
}
exports.getArrayFrequencyMap = getArrayFrequencyMap;
function areEqualNumberFrequencyMaps(first, second) {
    if (first.keys.length !== second.keys.length) {
        return false;
    }
    const firstIter = Array.from(first.entries());
    for (let [key, value] of firstIter) {
        if (second.get(key) === null || second.get(key) === undefined) {
            return false;
        }
        if (second.get(key) !== first.get(key)) {
            return false;
        }
    }
    const secondIter = Array.from(second.entries());
    for (let [key, value] of secondIter) {
        if (first.get(key) === null || first.get(key) === undefined) {
            return false;
        }
        if (first.get(key) !== second.get(key)) {
            return false;
        }
    }
    return true;
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
function isEqualNumberArray(first, second) {
    if (first.length !== second.length) {
        return false;
    }
    const length = first.length;
    for (let i = 0; i < length; i++) {
        if (first[i] !== second[i]) {
            return false;
        }
    }
    return true;
}
exports.isEqualNumberArray = isEqualNumberArray;
/**
 * Determines if two number arrays are similar according to if they have the same data points, although they may not be in the same order
 *
 * @param first A number array
 * @param second Another number array
 * @returns Whether the two number arrays are considered similar according to the described conditions
 */
function isSimilarNumberArray(first, second) {
    if (first.length !== second.length) {
        return false;
    }
    const firstFreqMap = getArrayFrequencyMap(first);
    const secondFreqMap = getArrayFrequencyMap(second);
    return areEqualNumberFrequencyMaps(firstFreqMap, secondFreqMap);
}
exports.isSimilarNumberArray = isSimilarNumberArray;
function capitalized(word) {
    if (word.length === 0) {
        return word;
    }
    const firstLetter = word.charAt(0);
    return firstLetter.toUpperCase().concat(word.slice(1).toLowerCase());
}
exports.capitalized = capitalized;
function isError(e) {
    return typeof (e) === "object" && e !== null && "stack" in e && typeof (e.stack) === 'string' && "message" in e && typeof (e.message) === 'string';
}
exports.isError = isError;
function isInBounds2D(matrix, row, col) {
    if (matrix.length === 0)
        return false;
    return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}
exports.isInBounds2D = isInBounds2D;
function flipObject(obj) {
    return Object.fromEntries(Object.entries(obj).map(entry => [entry[1], entry[0]]));
}
exports.flipObject = flipObject;
/**
 * Concatenates multiple Uint8ClampedArrays into one Uint8ClampedArray
 *
 * @param arrays A variable argument of Uint8ClampedArrays
 * @returns A concatenated Uint8ClampedArray of all inputted arrays
 */
function concatUint8ClampedArrays(...arrays) {
    const totalLength = arrays.reduce((prev, curr) => prev + curr.length, 0);
    const newArray = new Uint8ClampedArray(totalLength);
    let stepLoc = 0;
    for (let i = 0; i < arrays.length; i++) {
        newArray.set(arrays[i], stepLoc);
        stepLoc += arrays[i].length;
    }
    return newArray;
}
exports.concatUint8ClampedArrays = concatUint8ClampedArrays;
