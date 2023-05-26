import { shape } from "./Shape";

export class rentangle extends shape {

    constructor(theX:number,theY:number,private _width:number,private _length:number){
        super(theX,theY);
    }
    get getWidth():number{
        return this._width;
    } 
    set setWidth(width:number){
        this._width=width;
    }
    set setLength(width:number){
        this._width=width;
    }
    get getLength():number{
        return this._width;
    } 
    get getInfo():string{
        return `${super.toString}, ${this._length}, ${this._width}`;
    }
}   