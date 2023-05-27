"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shape = void 0;
class shape {
    constructor(_x, _y) {
        this._x = _x;
        this._y = _y;
    }
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get getInfo() {
        return `x= ${this._x}, y=${this._y} `;
    }
}
exports.shape = shape;
