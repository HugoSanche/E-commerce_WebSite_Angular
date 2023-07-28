import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../common/payment-info';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl=environment.myproyectsApiUrl+ '/checkout/purchase';
  
  private paymentIntentUrl=environment.myproyectsApiUrl+'/checkout/payment-intent';


  
  constructor(private httpClient:HttpClient) { }

  placeOrder(purchase:Purchase): Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);    
  }  
  createPaymentIntent(paymentInfo:PaymentInfo):Observable<any>{
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl,PaymentInfo);
  };
}











