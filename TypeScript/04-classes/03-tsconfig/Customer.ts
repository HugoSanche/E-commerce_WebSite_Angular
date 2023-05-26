class customer{
    private _firstName:string;
    private _lastName:string;

    constructor(firstName:string, lastName:string ){
        this._firstName=firstName;
        this._lastName=lastName;
    }

    get firstName():string{
        return this._firstName;
    } 

    set firstName(firstName:string){
        this._firstName=firstName;
    }
    get lastName():string{
        return this._lastName;
    }
    set lastName(lastName:string){
        this._lastName=lastName;
    }
}
let cli=new customer("Hugo","Baltazar");
console.log(cli);

