package com.myproyects.ecommerce.Service;

import com.myproyects.ecommerce.dto.PaymentInfo;
import com.myproyects.ecommerce.dto.Purchase;
import com.myproyects.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;


}
