import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  //Subject is a subclases of observable
  //we can use Subject tu publish events in out code
  //The event will send to all of the subscribers 

  //BehaviorSubject.- Has a buffer of the last event
  // Once subscribed, subcribers recieves the lates event sent prior to subscribing
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  
  //storage: Storage=sessionStorage;//session data its open only when web browser its open
  storage: Storage=localStorage;//session data is persisted and survives browser restarts


  constructor() { 
    // read data from storage
    let data=JSON.parse(this.storage.getItem('cartItems'));

    if (data!=null){
        this.cartItems=data;

        // compute totals based on the data that is read from storage
        this.computerCartTotals();
    }

  }

  addToCart(theCartItem: CartItem) {
    //check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;
    if (this.cartItems.length > 0) {
      // find the item in the cart based on item id
      //Returns firt element that passes else return undefined
      existingCartItem=this.cartItems.find(tempCartItem=>tempCartItem.id===theCartItem.id);
        
      // check if we found it
        alreadyExistsInCart = (existingCartItem != undefined);
    }
      if (alreadyExistsInCart) {
        //increment the quantity
        existingCartItem.quantity++;
      }
      else {
        // just add the item to the array
        this.cartItems.push(theCartItem);
      }
     // compute cart total price and total quantity
     this.computerCartTotals();
  }

  computerCartTotals() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;
    
    for (let currentCartItem of this.cartItems){
      totalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
      totalQuantityValue+=currentCartItem.quantity;
    }
    //publish the new values ... all subscrubers will receibe the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue,totalQuantityValue);

    //persist cart data
    this.persistCartItems();
  }
persistCartItems(){
  this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
}

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contens of the cart');
    for(let tempCartItem of this.cartItems){
      const subTotalPrice=tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`name:${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice},subTotalPrice=${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)},totalQuantity:${totalQuantityValue}`);
    console.log('-----');

  }



  decrementQuantity(theCartItem: CartItem) {
      theCartItem.quantity--;
      if (theCartItem.quantity===0){
        this.remove(theCartItem);
      }
      else{
        this.computerCartTotals();
      }
  }
  remove(theCartItem: CartItem) {
    // get index of items in the array
    const itemIndex=this.cartItems.findIndex(tempCartItem=> tempCartItem.id ===theCartItem.id);
    if (itemIndex>-1){
      this,this.cartItems.splice(itemIndex,1);
      this.computerCartTotals();
    }
  
  }
}













