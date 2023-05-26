class customer{
    firstName:string;
    lastName:string;

    constructor(firstName:string, lastName:string ){
        this.firstName=firstName;
        this.lastName=lastName;
    }
}
let cli=new customer("Hugo","Baltazar");
console.log(cli);

