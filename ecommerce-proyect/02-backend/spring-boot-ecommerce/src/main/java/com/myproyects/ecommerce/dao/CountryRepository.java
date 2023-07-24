package com.myproyects.ecommerce.dao;

import com.myproyects.ecommerce.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel="countries",path = "countries")
public interface CountryRepository extends JpaRepository<Country,Integer> {
}
