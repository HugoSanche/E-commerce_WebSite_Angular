"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = require("./Circle");
const Shape_1 = require("./Shape");
const Rentangle_1 = require("./Rentangle");
let myShape = new Shape_1.shape(5, 7);
let myCircle = new Circle_1.circle(10, 5, 3);
let myRentangle = new Rentangle_1.rentangle(4, 3, 8, 8);
let theShape = [];
theShape.push(myShape);
theShape.push(myCircle);
theShape.push(myRentangle);
for (let tempShape of theShape) {
    console.log(tempShape);
}
