package com.myproyects.ecommerce.Service;

import com.myproyects.ecommerce.dao.CustomerRepository;
import com.myproyects.ecommerce.dto.PaymentInfo;
import com.myproyects.ecommerce.dto.Purchase;
import com.myproyects.ecommerce.dto.PurchaseResponse;
import com.myproyects.ecommerce.entity.Customer;
import com.myproyects.ecommerce.entity.Order;
import com.myproyects.ecommerce.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CheckoutServiceImp implements CheckoutService{

    private CustomerRepository customerRepository;
    public CheckoutServiceImp(CustomerRepository customerRepository,
                              @Value("${stripe.key.secret}") String secretKey){
        this.customerRepository=customerRepository;

        //initialize Stripe API with secret key
        Stripe.apiKey=secretKey;
    }
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        // retrieve the order info from dto
        Order order = purchase.getOrder();

        // generate tracking number
        String orderTrackingNumber=generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // populate order with orderItems
        Set<OrderItem> orderItems=purchase.getOrderItems();
        orderItems.forEach(item->order.add(item));

        // populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // populate customer with order
        Customer customer=purchase.getCustomer();

        //check if this is an existing customer
        String theEmail=customer.getEmail();
        Customer customerFromDB=customerRepository.findByEmail(theEmail);

        if (customerFromDB!=null){
            // we found ... let's assing them accordingly
            customer=customerFromDB;
        }

        customer.add(order);

        // save to the database
        customerRepository.save(customer);
        return new PurchaseResponse(orderTrackingNumber);
    }

    @Override
    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
        List<String> paymentMethodTypes=new ArrayList<>();
        paymentMethodTypes.add("card");

        Map<String,Object> params= new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency",paymentInfo.getCurrency());
        params.put("payment_method_types",paymentMethodTypes);
        params.put("description","Myproyects purchase");
        params.put("receipt_email",paymentInfo.getReceiptEmail());

        return PaymentIntent.create(params);
    }

    private String generateOrderTrackingNumber() {
        // generate a random UUID number (UUID version-4)
        //check wikipedia Universally_unique_identifier
        return UUID.randomUUID().toString();
    }
}












