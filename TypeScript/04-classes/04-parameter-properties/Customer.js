"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customer = void 0;
class customer {
    //aqui se defien el tipo de dato y el contructor al mismo tiempo
    //ya no declaras private _firstNam:string, private _lastName:string
    constructor(_firstName, _lastName) {
        this._firstName = _firstName;
        this._lastName = _lastName;
    }
    get firstName() {
        console.log("I am getter");
        return this._firstName;
    }
    set firstName(firstName) {
        this._firstName = firstName;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        this._lastName = lastName;
    }
}
exports.customer = customer;
