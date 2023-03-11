"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const Vector2_1 = require("./Vector2");
const Dimension_1 = require("./Dimension");
const LineSegment_1 = require("./LineSegment");
const Range_1 = require("./Range");
class Box {
    constructor(topleft, size) {
        this.topleft = Vector2_1.Vector2.fromData(topleft);
        this.size = Dimension_1.Dimension2D.fromData(size);
    }
    static from(row, col, width, height) {
        return new Box(new Vector2_1.Vector2(row, col), new Dimension_1.Dimension2D(width, height));
    }
    static fromData(box) {
        return new Box(box.topleft, box.size);
    }
    static enclosed(points) {
        if (points.length === 0) {
            return Box.ZERO;
        }
        let minRow = points[0].row;
        let maxRow = points[0].row;
        let minCol = points[0].col;
        let maxCol = points[0].col;
        for (let i = 0; i < points.length; i++) {
            minRow = Math.min(minRow, points[i].row);
            minCol = Math.min(minCol, points[i].col);
            maxRow = Math.max(maxRow, points[i].row);
            maxCol = Math.max(maxCol, points[i].col);
        }
        return Box.from(minRow, minCol, Math.abs(maxCol - minCol), Math.abs(maxRow - minRow));
    }
    get row() {
        return this.topleft.row;
    }
    get col() {
        return this.topleft.col;
    }
    get width() {
        return this.size.width;
    }
    get height() {
        return this.size.height;
    }
    get area() {
        return this.size.area;
    }
    get right() {
        return this.col + this.width;
    }
    get left() {
        return this.col;
    }
    get top() {
        return this.row;
    }
    get bottom() {
        return this.row + this.height;
    }
    get centerrow() {
        return this.row + this.height / 2;
    }
    get centercol() {
        return this.col + this.width / 2;
    }
    get center() {
        return new Vector2_1.Vector2(this.centerrow, this.centercol);
    }
    get bottomright() {
        return new Vector2_1.Vector2(this.bottom, this.right);
    }
    get topright() {
        return new Vector2_1.Vector2(this.top, this.right);
    }
    get bottomleft() {
        return new Vector2_1.Vector2(this.bottom, this.left);
    }
    translate(vector) {
        return new Box(this.topleft.add(vector), this.size);
    }
    setCenter(vector) {
        const topleft = Vector2_1.Vector2.fromData(vector).subtract({ row: this.size.height / 2, col: this.size.width / 2 });
        return new Box(topleft, this.size);
    }
    expand(width, height) {
        return new Box(this.topleft, this.size.expand(width, height));
    }
    pointInside(vec) {
        return vec.row >= this.top && vec.row <= this.bottom && vec.col >= this.left && vec.col <= this.right;
    }
    corners() {
        return [this.topleft, this.topright, this.bottomleft, this.bottomright];
    }
    trunc() {
        return new Box(this.topleft.trunc(), this.size.trunc());
    }
    floor() {
        return new Box(this.topleft.floor(), this.size.floor());
    }
    ceil() {
        return new Box(this.topleft.ceil(), this.size.ceil());
    }
    round() {
        return new Box(this.topleft.round(), this.size.round());
    }
    lines() {
        return [
            new LineSegment_1.LineSegment(this.topleft, this.topright),
            new LineSegment_1.LineSegment(this.topright, this.bottomright),
            new LineSegment_1.LineSegment(this.bottomright, this.bottomleft),
            new LineSegment_1.LineSegment(this.bottomleft, this.topleft),
        ];
    }
    cells() {
        return (0, Vector2_1.filterVector2ListDuplicates)(this.lines().flatMap(line => line.cells()));
    }
    boxIntersect(other) {
        return (0, Range_1.rangeIntersect)(this.left, this.right, other.left, other.right) && (0, Range_1.rangeIntersect)(this.top, this.bottom, other.top, other.bottom);
    }
    intersectingArea(other) {
        if (this.boxIntersect(other)) {
            const row = Math.max(this.row, other.row);
            const col = Math.max(this.col, other.col);
            const width = Math.abs(col - Math.min(this.right, other.right));
            const height = Math.abs(row - Math.min(this.bottom, other.bottom));
            return Box.from(row, col, width, height);
        }
        throw new Error(`Cannot find intersecting areas of boxes that do not intersect ${this} ${other} `);
    }
    toString() {
        return `Box: {
            topleft: ${this.topleft}
            size: ${this.size}
        }`;
    }
    equals(other) {
        return this.topleft.equals(other.topleft) && this.size.equals(other.size);
    }
}
exports.Box = Box;
Box.ZERO = Box.from(0, 0, 0, 0);
Box.MAX = Box.from(-Math.sqrt(Number.MAX_VALUE) / 2 - 1, -Math.sqrt(Number.MAX_VALUE) / 2 - 1, Math.sqrt(Number.MAX_VALUE) - 1, Math.sqrt(Number.MAX_VALUE) - 1);
