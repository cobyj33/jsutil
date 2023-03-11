"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CyclicalArray = void 0;
class CyclicalArray {
    constructor(array) {
        this.array = [];
        if (array.length === 0) {
            throw new Error("Cannot have empty CyclicalArray");
        }
        this.array = array;
        this.currentIndex = 0;
    }
    peekBack() {
        let peekIndex = this.currentIndex;
        peekIndex === 0 ? peekIndex = this.array.length - 1 : peekIndex--;
        return this.array[peekIndex];
    }
    back() {
        if (this.array.length === 0) {
            throw new Error("Cannot have empty CyclicalArray");
        }
        this.currentIndex === 0 ? this.currentIndex = this.array.length - 1 : this.currentIndex--;
        return this.array[this.currentIndex];
    }
    peekForward() {
        let peekIndex = this.currentIndex;
        peekIndex === this.array.length - 1 ? peekIndex = 0 : peekIndex++;
        return this.array[peekIndex];
    }
    forward() {
        if (this.array.length === 0) {
            throw new Error("Cannot have empty CyclicalArray");
        }
        this.currentIndex === this.array.length - 1 ? this.currentIndex = 0 : this.currentIndex++;
        return this.array[this.currentIndex];
    }
}
exports.CyclicalArray = CyclicalArray;
