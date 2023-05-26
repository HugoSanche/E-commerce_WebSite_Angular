"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circle = void 0;
const Shape_1 = require("./Shape");
class circle extends Shape_1.shape {
    constructor(theX, theY, _radius) {
        super(theX, theY);
        this._radius = _radius;
    }
    get radiusx() {
        return this._radius;
    }
    set radius(theRadius) {
        this._radius = theRadius;
    }
    get getInfo() {
        return `${super.toString}, ${this._radius}`;
    }
}
exports.circle = circle;
