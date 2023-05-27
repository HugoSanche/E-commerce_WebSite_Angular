import { shape } from "./Shape";

export class circle extends shape {
  

    constructor(theX:number,theY:number,private _radius:number){
        super(theX,theY);
    }
    get radiusx():number{
        return this._radius;
    }
    set radius(theRadius:number){
        this._radius=theRadius;
    }
    get getInfo():string{
        return `${super.toString}, ${this._radius}`;
    }
    calculateArea(): number {
        return Math.PI*Math.pow(this._radius,2);
    }
}