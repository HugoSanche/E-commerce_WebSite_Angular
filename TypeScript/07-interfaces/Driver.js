"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const footBallCoach_1 = require("./footBallCoach");
const runCoach_1 = require("./runCoach");
let myRunCoach = new runCoach_1.runCoach();
let myFootBallCoach = new footBallCoach_1.footBallCoach();
let arrayCoach = [];
arrayCoach.push(myFootBallCoach);
arrayCoach.push(myRunCoach);
for (let tempArray of arrayCoach) {
    console.log(tempArray.getDailyworkout());
}
