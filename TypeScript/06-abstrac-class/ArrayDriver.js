"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = require("./Circle");
const Rentangle_1 = require("./Rentangle");
let myCircle = new Circle_1.circle(10, 5, 3);
let myRentangle = new Rentangle_1.rentangle(4, 3, 8, 8);
let theShape = [];
theShape.push(myCircle);
theShape.push(myRentangle);
for (let tempShape of theShape) {
    console.log(tempShape);
    console.log(tempShape.calculateArea());
    console.log();
}
