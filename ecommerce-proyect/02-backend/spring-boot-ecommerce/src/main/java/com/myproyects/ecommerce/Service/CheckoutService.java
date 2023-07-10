package com.myproyects.ecommerce.Service;

import com.myproyects.ecommerce.dto.Purchase;
import com.myproyects.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
