"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Customer_1 = require("./Customer"); //import class customer
let mycustomer = new Customer_1.customer("Veronica", "Perez");
console.log("My customer " + mycustomer.firstName); //getting the value from the getter of the class customer
