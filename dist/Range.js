"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeIntersect = exports.rangeContains = exports.Range = void 0;
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    contains(value) {
        return rangeContains(value, this.start, this.end);
    }
    intersectsRange(other) {
        return rangeIntersect(this.start, this.end, other.start, other.end);
    }
}
exports.Range = Range;
function rangeContains(value, lower, upper) {
    return value >= lower && value <= upper;
}
exports.rangeContains = rangeContains;
function rangeIntersect(firstLower, firstUpper, secondLower, secondUpper) {
    return rangeContains(firstLower, secondLower, secondUpper) || rangeContains(firstUpper, secondLower, secondUpper) || rangeContains(secondLower, firstLower, firstUpper) || rangeContains(secondUpper, firstLower, firstUpper);
}
exports.rangeIntersect = rangeIntersect;
