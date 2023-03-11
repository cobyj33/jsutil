"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineSegment = void 0;
const shapes_1 = require("./shapes");
const Vector2_1 = require("./Vector2");
class LineSegment {
    constructor(start, end) {
        this.start = Vector2_1.Vector2.fromData(start);
        this.end = Vector2_1.Vector2.fromData(end);
    }
    withEnd(end) {
        return new LineSegment(this.start, end);
    }
    withStart(start) {
        return new LineSegment(start, this.end);
    }
    static getCells(start, end) {
        return new LineSegment(start, end).cells();
    }
    static from(rowStart, colStart, rowEnd, colEnd) {
        return new LineSegment(new Vector2_1.Vector2(rowStart, colStart), new Vector2_1.Vector2(rowEnd, colEnd));
    }
    cells() {
        return (0, shapes_1.getLine)(this.start, this.end);
    }
    length() {
        return this.start.distance(this.end);
    }
    transform(callbackfn) {
        return new LineSegment(callbackfn(this.start), callbackfn(this.end));
    }
}
exports.LineSegment = LineSegment;
