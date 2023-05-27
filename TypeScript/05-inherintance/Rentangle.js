"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentangle = void 0;
const Shape_1 = require("./Shape");
class rentangle extends Shape_1.shape {
    constructor(theX, theY, _width, _length) {
        super(theX, theY);
        this._width = _width;
        this._length = _length;
    }
    get getWidth() {
        return this._width;
    }
    set setWidth(width) {
        this._width = width;
    }
    set setLength(width) {
        this._width = width;
    }
    get getLength() {
        return this._width;
    }
    get getInfo() {
        return `${super.toString}, ${this._length}, ${this._width}`;
    }
}
exports.rentangle = rentangle;
