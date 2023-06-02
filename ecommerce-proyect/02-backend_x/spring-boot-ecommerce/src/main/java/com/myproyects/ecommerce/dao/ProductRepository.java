package com.myproyects.ecommerce.dao;

import com.myproyects.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

//Product= class product
//Long= type date for the key of the class Product.- private Long id
public interface ProductRepository extends JpaRepository<Product, Long> {
}
