"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVector2ListMatches = exports.filterVector2ListMatches = exports.removeVector2ListDuplicates = exports.filterVector2ListDuplicates = exports.getVector2ListDuplicates = exports.isIVector2 = exports.vector2Abs = exports.vector2IsInteger = exports.lerp = exports.vector2Equals = exports.dotProductVector2 = exports.angleBetweenVector2 = exports.midPointBetweenVector2 = exports.distanceBetweenVector2 = exports.vector2FromAngle = exports.roundVector2 = exports.scaleVector2 = exports.subtractVector2 = exports.vector2Int = exports.addVector2 = exports.translateVector2 = exports.vector2ToString = exports.vector2Normalized = exports.vector2AlterToRow = exports.vector2AlterToCol = exports.vector2ToAngle = exports.vector2ToLength = exports.rotateVector2 = exports.getVectorLength = exports.adjacentVector2 = exports.Vector2 = void 0;
const Set2D_1 = require("./Set2D");
class Vector2 {
    row;
    col;
    static ZERO = new Vector2(0, 0);
    static EAST = new Vector2(1, 0);
    static WEST = new Vector2(-1, 0);
    static NORTH = new Vector2(0, -1);
    static SOUTH = new Vector2(0, 1);
    static NORTHWEST = Vector2.NORTH.add(Vector2.WEST).normalize();
    static SOUTHWEST = Vector2.SOUTH.add(Vector2.WEST).normalize();
    static NORTHEAST = Vector2.NORTH.add(Vector2.EAST).normalize();
    static SOUTHEAST = Vector2.SOUTH.add(Vector2.EAST).normalize();
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
    static fromData(vector) {
        return new Vector2(vector.row, vector.col);
    }
    static fromDimension(width, height) {
        return new Vector2(height, width);
    }
    withRow(row) {
        if (typeof (row) === "function") {
            return new Vector2(row(this.row), this.col);
        }
        return new Vector2(row, this.col);
    }
    withCol(col) {
        if (typeof (col) === "function") {
            return new Vector2(this.row, col(this.col));
        }
        return new Vector2(this.row, col);
    }
    rowcomp() {
        return new Vector2(this.row, 0);
    }
    colcomp() {
        return new Vector2(0, this.col);
    }
    isZero() {
        return this.equals(Vector2.ZERO);
    }
    length() {
        return getVectorLength(this);
    }
    angle() {
        return vector2ToAngle(this);
    }
    floor() {
        return new Vector2(Math.floor(this.row), Math.floor(this.col));
    }
    ceil() {
        return new Vector2(Math.ceil(this.row), Math.ceil(this.col));
    }
    trunc() {
        return new Vector2(Math.trunc(this.row), Math.trunc(this.col));
    }
    rotate(angle) {
        return Vector2.fromData(rotateVector2(this, angle));
    }
    toLength(length) {
        return Vector2.fromData(vector2ToLength(this, length));
    }
    scale(amount) {
        return Vector2.fromData(scaleVector2(this, amount));
    }
    alterToCol(col) {
        return Vector2.fromData(vector2AlterToCol(this, col));
    }
    alterToRow(row) {
        return Vector2.fromData(vector2AlterToRow(this, row));
    }
    normalize() {
        return Vector2.fromData(vector2Normalized(this));
    }
    toString() {
        return vector2ToString(this);
    }
    translate(row, col) {
        return Vector2.fromData(translateVector2(this, row, col));
    }
    int() {
        return Vector2.fromData(vector2Int(this));
    }
    add(other) {
        return Vector2.fromData(addVector2(this, other));
    }
    addcomp(row, col) {
        return this.add({ row: row, col: col });
    }
    subtract(other) {
        return Vector2.fromData(subtractVector2(this, other));
    }
    round() {
        return Vector2.fromData(roundVector2(this));
    }
    distance(other) {
        return distanceBetweenVector2(this, other);
    }
    midpoint(other) {
        return Vector2.fromData(midPointBetweenVector2(this, other));
    }
    angleBetween(other) {
        return angleBetweenVector2(this, other);
    }
    dot(other) {
        return dotProductVector2(this, other);
    }
    lerp(t, other) {
        return Vector2.fromData(lerp(t, this, other));
    }
    adjacent() {
        return adjacentVector2(this).map(vec => Vector2.fromData(vec));
    }
    equals(other) {
        return vector2Equals(this, other);
    }
    abs() {
        return Vector2.fromData(vector2Abs(this));
    }
    min() {
        return Math.min(this.row, this.col);
    }
    max() {
        return Math.max(this.row, this.col);
    }
    clone() {
        return new Vector2(this.row, this.col);
    }
    data() {
        return {
            row: this.row,
            col: this.col
        };
    }
}
exports.Vector2 = Vector2;
function adjacentVector2(vec) {
    const offsets = [{ row: 0, col: 1 }, { row: 0, col: -1 }, { row: 1, col: 0 }, { row: -1, col: 0 }];
    return offsets.map(offset => addVector2(vec, offset));
}
exports.adjacentVector2 = adjacentVector2;
function getVectorLength(vector2) {
    return Math.sqrt(vector2.row * vector2.row + vector2.col * vector2.col);
}
exports.getVectorLength = getVectorLength;
function rotateVector2(vector, angleInRadians) {
    const newCol = vector.col * Math.cos(angleInRadians) + vector.row * Math.sin(angleInRadians);
    const newRow = -vector.col * Math.sin(angleInRadians) + vector.row * Math.cos(angleInRadians);
    return { row: newRow, col: newCol };
}
exports.rotateVector2 = rotateVector2;
function vector2ToLength(vector, length) {
    if (vector.row === 0 && vector.col === 0) {
        throw new Error('cannot change length of 0 length vector');
    }
    return scaleVector2(vector, length / getVectorLength(vector));
}
exports.vector2ToLength = vector2ToLength;
function vector2ToAngle(vector) {
    return Math.atan2(-vector.row, vector.col);
}
exports.vector2ToAngle = vector2ToAngle;
function vector2AlterToCol(vector, col) {
    const factor = col / vector.col;
    return scaleVector2(vector, factor);
}
exports.vector2AlterToCol = vector2AlterToCol;
function vector2AlterToRow(vector, row) {
    const factor = row / vector.row;
    return scaleVector2(vector, factor);
}
exports.vector2AlterToRow = vector2AlterToRow;
function vector2Normalized(vector) {
    return vector2ToLength(vector, 1);
}
exports.vector2Normalized = vector2Normalized;
function vector2ToString(vector) {
    return `IVector2: [ Row: ${vector.row}, Col: ${vector.col} Angle: ${vector2ToAngle(vector) * 180.0 / Math.PI}]`;
}
exports.vector2ToString = vector2ToString;
function translateVector2(vector, row, col) {
    return { row: vector.row + row, col: vector.col + col };
}
exports.translateVector2 = translateVector2;
function addVector2(vector, other) {
    return { row: vector.row + other.row, col: vector.col + other.col };
}
exports.addVector2 = addVector2;
function vector2Int(vector) {
    return { row: Math.trunc(vector.row), col: Math.trunc(vector.col) };
}
exports.vector2Int = vector2Int;
function subtractVector2(vector, other) {
    return { row: vector.row - other.row, col: vector.col - other.col };
}
exports.subtractVector2 = subtractVector2;
function scaleVector2(vector, scale) {
    return { row: vector.row * scale, col: vector.col * scale };
}
exports.scaleVector2 = scaleVector2;
function roundVector2(vector) {
    return { row: Math.round(vector.row), col: Math.round(vector.col) };
}
exports.roundVector2 = roundVector2;
function vector2FromAngle(angleInRadians) {
    return { row: -Math.sin(angleInRadians), col: Math.cos(angleInRadians) };
}
exports.vector2FromAngle = vector2FromAngle;
function distanceBetweenVector2(first, second) {
    return Math.sqrt((first.row - second.row) * (first.row - second.row) + (first.col - second.col) * (first.col - second.col));
}
exports.distanceBetweenVector2 = distanceBetweenVector2;
function midPointBetweenVector2(first, second) {
    return { row: (first.row + second.row) / 2, col: (first.col + second.col) / 2 };
}
exports.midPointBetweenVector2 = midPointBetweenVector2;
function angleBetweenVector2(first, second) {
    return Math.abs(vector2ToAngle(first) - vector2ToAngle(second));
}
exports.angleBetweenVector2 = angleBetweenVector2;
function dotProductVector2(first, second) {
    const angle = angleBetweenVector2(first, second);
    return getVectorLength(first) * getVectorLength(second) * Math.cos(angle);
}
exports.dotProductVector2 = dotProductVector2;
function vector2Equals(vector, other) {
    return vector.row == other.row && vector.col === other.col;
}
exports.vector2Equals = vector2Equals;
function lerp(t, first, second) {
    return addVector2(first, scaleVector2(subtractVector2(second, first), t));
}
exports.lerp = lerp;
function vector2IsInteger(vec) {
    return Number.isInteger(vec.row) && Number.isInteger(vec.col);
}
exports.vector2IsInteger = vector2IsInteger;
function vector2Abs(vec) {
    return { row: Math.abs(vec.row), col: Math.abs(vec.col) };
}
exports.vector2Abs = vector2Abs;
function isIVector2(obj) {
    return typeof (obj) === "object" && obj !== null &&
        "row" in obj && "col" in obj &&
        typeof (obj.row) === "number" && typeof (obj.col) === "number";
}
exports.isIVector2 = isIVector2;
function vector2ListToSet2D(list) {
    const set2D = new Set2D_1.Set2D();
    list.forEach(vec => set2D.add(vec.row, vec.col));
    return set2D;
}
function getVector2ListDuplicatesSet(list) {
    const found = new Set2D_1.Set2D();
    const duplicates = new Set2D_1.Set2D();
    list.forEach(vec => {
        if (found.has(vec.row, vec.col)) {
            duplicates.add(vec.row, vec.col);
        }
        found.add(vec.row, vec.col);
        return true;
    });
    return duplicates;
}
/**
 * Returns all Vector2s which are duplicates in the inputted list
 * Note that the outputted list will still be unique. If a value appears multiple times in the inputted list, it will appear once in the outputted list
 *
 * @param list The list to be filtered
 * @returns A list of all Vector2 values found to be duplicates
 */
function getVector2ListDuplicates(list) {
    return getVector2ListDuplicatesSet(list).getPairs();
}
exports.getVector2ListDuplicates = getVector2ListDuplicates;
/**
 * Takes any Vector2 values that are duplicates from the list array and makes them appear only once
 * Note this means that if a value appears twice in the inputted list, it will appear ONCE in the outputted list
 * Does not edit in place
 *
 * @param list The list to be filtered
 * @returns A new list, which is the original list with only unique values
 */
function filterVector2ListDuplicates(list) {
    const set2D = new Set2D_1.Set2D();
    return list.filter(vec => {
        if (set2D.has(vec.row, vec.col)) {
            return false;
        }
        set2D.add(vec.row, vec.col);
        return true;
    });
}
exports.filterVector2ListDuplicates = filterVector2ListDuplicates;
/**
 * Completely removes any Vector2 values that are duplicates from the list array
 * Note this means that if a value appears twice in the inputted list, it will NOT be present in the outputted list
 * Does not edit in place
 *
 * @param list The list to be filtered
 * @returns A new list, which is the original list with only ORIGINALLY unique values
 */
function removeVector2ListDuplicates(list) {
    const duplicates = getVector2ListDuplicatesSet(list);
    return list.filter(vec => !duplicates.has(vec.row, vec.col));
}
exports.removeVector2ListDuplicates = removeVector2ListDuplicates;
/**
 * Keep any Vector2 values from the list array that match any values in the matches array
 * Does not edit in place
 *
 * @param list The list to be filtered
 * @param matches The values that will be tested as matches against the list
 * @returns A new list, which is the original list with only values that match any of the Vector2s in the matches parameter
 */
function filterVector2ListMatches(list, matches) {
    const set2D = Set2D_1.Set2D.fromVector2DArray(matches);
    return list.filter(vec => set2D.has(vec.row, vec.col));
}
exports.filterVector2ListMatches = filterVector2ListMatches;
/**
 * Remove any Vector2 values from the list array that match any values in the matches array
 * Does not edit in place
 *
 * @param list The list to be filtered
 * @param matches The values that will be tested as matches against the list
 * @returns A **new** list, which is the original list without any values that match the Vector2s in the matches parameter
 */
function removeVector2ListMatches(list, matches) {
    const set2D = Set2D_1.Set2D.fromVector2DArray(matches);
    return list.filter(vec => set2D.has(vec.row, vec.col) === false);
}
exports.removeVector2ListMatches = removeVector2ListMatches;
