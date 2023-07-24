package com.myproyects.ecommerce.dao;

import com.myproyects.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//Product= class product
//Long= type date for the key of the class Product.- private Long id

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pagable);
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);


}




