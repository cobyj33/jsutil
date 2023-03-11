"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dimension2D = void 0;
class Dimension2D {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    get area() {
        return this.width * this.height;
    }
    aspectRatio() {
        return this.width / this.height;
    }
    tuple() {
        return [this.width, this.height];
    }
    static fromTuple(tuple) {
        return new Dimension2D(tuple[0], tuple[1]);
    }
    static fromData(data) {
        return new Dimension2D(data.width, data.height);
    }
    withWidth(width) {
        return new Dimension2D(width, this.height);
    }
    withHeight(height) {
        return new Dimension2D(this.width, height);
    }
    scale(factor) {
        return new Dimension2D(this.width * factor, this.height * factor);
    }
    expand(width, height) {
        return new Dimension2D(this.width + width, this.height + height);
    }
    subtract(other) {
        return new Dimension2D(this.width - other.width, this.height - other.height);
    }
    trunc() {
        return new Dimension2D(Math.trunc(this.width), Math.trunc(this.height));
    }
    floor() {
        return new Dimension2D(Math.floor(this.width), Math.floor(this.height));
    }
    ceil() {
        return new Dimension2D(Math.ceil(this.width), Math.ceil(this.height));
    }
    round() {
        return new Dimension2D(Math.round(this.width), Math.round(this.height));
    }
    equals(other) {
        return this.width === other.width && this.height === other.height;
    }
}
exports.Dimension2D = Dimension2D;
Dimension2D.ZERO = new Dimension2D(0, 0);
