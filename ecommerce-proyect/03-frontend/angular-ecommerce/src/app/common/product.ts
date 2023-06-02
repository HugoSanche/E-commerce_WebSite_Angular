export class Product {
    constructor (public sku:String,
                public name:String,
                public description:String,
                public unitPrice:number,
                public imageUrl:String,
                public active:boolean,
                public unitsInStock:number,
                public dateCreated:Date,
                public lastUpdated:Date,
                ){}

}
