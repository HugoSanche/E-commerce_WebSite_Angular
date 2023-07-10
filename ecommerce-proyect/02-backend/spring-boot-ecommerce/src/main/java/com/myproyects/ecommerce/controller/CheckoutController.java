package com.myproyects.ecommerce.controller;

import com.myproyects.ecommerce.Service.CheckoutService;
import com.myproyects.ecommerce.dto.Purchase;
import com.myproyects.ecommerce.dto.PurchaseResponse;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    private CheckoutService checkoutService;
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService=checkoutService;
    }
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse=checkoutService.placeOrder(purchase);

        return purchaseResponse;
    }
}





















