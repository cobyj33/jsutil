"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Set2D = void 0;
class Set2D {
    map = new Map();
    _length;
    constructor(values = []) {
        this._length = 0;
        values.forEach(value => this.add(value[0], value[1]));
    }
    fullClear() {
        this.map = new Map();
        this._length = 0;
    }
    clear() {
        [...this.map.values()].forEach(set => set.clear());
        this._length = 0;
    }
    get length() { return this._length; }
    static fromVector2DArray(values) {
        const set2D = new Set2D();
        values.forEach(value => set2D.add(value.row, value.col));
        return set2D;
    }
    static fromNumberMatrix(values) {
        const set = new Set2D();
        for (let row = 0; row < values.length; row++) {
            for (let col = 0; col < values[row].length; col++) {
                if (values[row][col] === 1) {
                    set.add(row, col);
                }
            }
        }
        return set;
    }
    getTuples() {
        const arr = new Array(this.length);
        let i = 0;
        this.forEach((pair) => {
            arr[i] = pair;
            i++;
        });
        return arr;
    }
    getPairs() {
        return this.getTuples().map(([row, col]) => ({ row: row, col: col }));
    }
    forEach(callbackfn) {
        this.map.forEach((set, first) => set.forEach(second => callbackfn([first, second])));
    }
    add(first, second) {
        if (this.map.get(first)?.has(second) === false) {
            this.map.get(first)?.add(second);
            this._length += 1;
        }
        else if (this.map.has(first) === false) {
            this.map.set(first, new Set([second]));
            this._length += 1;
        }
    }
    remove(first, second) {
        let set;
        if (set = this.map.get(first)) {
            if (set.has(second)) {
                set.delete(second);
                this._length -= 1;
                if (set.size === 0) {
                    this.map.delete(first);
                }
            }
        }
    }
    has(first, second) {
        return this.map.get(first)?.has(second) || false;
    }
    hasAll(tuples) {
        return tuples.every(tuple => this.has(tuple[0], tuple[1]));
    }
    hasAllExact(tuples) {
        return tuples.length === this.length && this.hasAll(tuples);
    }
    combine(...others) {
        const set = new Set2D();
        set.push(this, ...others);
        return set;
    }
    push(...others) {
        others.forEach(other => other.forEach(tuple => this.add(tuple[0], tuple[1])));
    }
    *[Symbol.iterator]() {
        for (const pair of this.map) {
            for (const second of pair[1]) {
                yield [pair[0], second];
            }
        }
    }
    equals(other) {
        if (this.length !== other.length) {
            return false;
        }
        for (const entry of this) {
            if (other.has(entry[0], entry[1]) === false) {
                return false;
            }
        }
        return true;
    }
}
exports.Set2D = Set2D;
