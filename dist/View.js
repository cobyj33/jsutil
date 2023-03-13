"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewOffset = exports.View = void 0;
const Vector2_1 = require("./Vector2");
class View {
    constructor(position, cellSize) {
        this.position = Vector2_1.Vector2.fromData(position);
        this.cellSize = cellSize;
    }
    get row() {
        return this.position.row;
    }
    get col() {
        return this.position.col;
    }
    static fromIView(view) {
        return new View(view.position, view.cellSize);
    }
    static from(row, col, cellSize) {
        return new View(new Vector2_1.Vector2(row, col), cellSize);
    }
    withPosition(value) {
        if (typeof (value) === "function") {
            return new View(value(this.position), this.cellSize);
        }
        else {
            return new View(value, this.cellSize);
        }
    }
    withCellSize(value) {
        if (typeof (value) === "function") {
            return new View(this.position, value(this.cellSize));
        }
        else {
            return new View(this.position, value);
        }
    }
    offset() {
        return Vector2_1.Vector2.fromData(getViewOffset(this));
    }
    clone() {
        return new View(this.position, this.cellSize);
    }
    equals(other) {
        return this.cellSize === other.cellSize && this.position.equals(other.position);
    }
    data() {
        return {
            position: this.position,
            cellSize: this.cellSize
        };
    }
}
exports.View = View;
function getViewOffset(view) {
    return { row: view.position.row * view.cellSize % view.cellSize, col: view.position.col * view.cellSize % view.cellSize };
}
exports.getViewOffset = getViewOffset;
