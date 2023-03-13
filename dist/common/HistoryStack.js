"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryStack = void 0;
class HistoryStack {
    history = [];
    index;
    _maxLength;
    get maxLength() { return this._maxLength; }
    set maxLength(request) {
        if (request <= 0) {
            throw new Error(`cannot set max history length less than or equal to 0: requested ${request} `);
        }
        else if (!Number.isInteger(request)) {
            throw new Error(`cannot pass non-integer value to history maxLength: requested ${request}`);
        }
        else {
            this._maxLength = request;
        }
    }
    get length() { return this.history.length; }
    get state() {
        return this.history[this.index];
    }
    get empty() { return this.history.length === 0; }
    constructor() {
        this.index = 0;
        this._maxLength = 30;
        this.history = [];
    }
    back() {
        if (this.history.length === 0) {
            throw new Error("ATTEMPTED TO MOVE BACKWARD IN EMPTY HISTORY");
        }
        else if (this.index <= 0) {
            this.index = 0;
            throw new Error("ALREADY AT BACK OF HISTORY");
        }
        else {
            this.index--;
        }
    }
    canGoBack() {
        return this.history.length > 0 && this.index > 0;
    }
    peekLatest() {
        if (this.history.length === 0) {
            throw new Error("EMPTY HISTORY");
        }
        return this.history[this.history.length - 1];
    }
    peek() {
        if (this.history.length === 0) {
            throw new Error("EMPTY HISTORY");
        }
        return this.history[this.index];
    }
    forward() {
        if (this.history.length === 0) {
            throw new Error("EMPTY HISTORY");
        }
        else if (this.index >= this.history.length) {
            this.index = this.history.length - 1;
            throw new Error("CANNOT MOVE FORWARD, ALREADY AT FRONT OF HISTORY");
        }
        else {
            this.index++;
        }
    }
    canGoForward() {
        return this.history.length > 0 && this.index < this.history.length - 1;
    }
    pushState(data) {
        if (this.history.length === 0) {
            this.history = this.history.concat([data]);
        }
        else {
            this.history = this.history.slice(0, this.index + 1).concat([data]);
        }
        this.index = this.history.length - 1;
    }
}
exports.HistoryStack = HistoryStack;
