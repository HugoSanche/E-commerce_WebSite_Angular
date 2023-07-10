package com.myproyects.ecommerce.dto;

import com.myproyects.ecommerce.entity.Address;
import com.myproyects.ecommerce.entity.Customer;
import com.myproyects.ecommerce.entity.Order;
import com.myproyects.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address billingAddress;
    private Address shippingAddress;
    private Order order;
    Set<OrderItem> orderItems=new HashSet<>();
}
