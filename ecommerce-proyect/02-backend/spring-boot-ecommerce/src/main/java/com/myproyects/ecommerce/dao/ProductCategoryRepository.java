package com.myproyects.ecommerce.dao;

import com.myproyects.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//"productCategory".- Name of JSON entry
//"product-category" url path /product-category

@RepositoryRestResource(collectionResourceRel="productCategory", path="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {
}











