package com.myproyects.ecommerce.Service;

import com.myproyects.ecommerce.dao.CustomerRepository;
import com.myproyects.ecommerce.dto.Purchase;
import com.myproyects.ecommerce.dto.PurchaseResponse;
import com.myproyects.ecommerce.entity.Customer;
import com.myproyects.ecommerce.entity.Order;
import com.myproyects.ecommerce.entity.OrderItem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImp implements CheckoutService{

    private CustomerRepository customerRepository;
    public CheckoutServiceImp(CustomerRepository customerRepository){
        this.customerRepository=customerRepository;
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
        customer.add(order);

        // save to the database
        customerRepository.save(customer);
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        // generate a random UUID number (UUID version-4)
        //check wikipedia Universally_unique_identifier
        return UUID.randomUUID().toString();
    }
}












