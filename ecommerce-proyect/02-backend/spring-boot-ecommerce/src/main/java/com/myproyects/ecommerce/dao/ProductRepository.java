package com.myproyects.ecommerce.dao;

import com.myproyects.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

//Product= class product
//Long= type date for the key of the class Product.- private Long id

@CrossOrigin("http://localhost:4200")

public interface ProductRepository extends JpaRepository<Product, Long> {
}




