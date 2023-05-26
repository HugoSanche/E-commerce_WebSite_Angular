export class customer{ //way to export class customer
   
    //aqui se defien el tipo de dato y el contructor al mismo tiempo
    //ya no declaras private _firstNam:string, private _lastName:string
    constructor(private _firstName:string,private _lastName:string ){        
    }

    get firstName():string{
        console.log("I am getter");
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

