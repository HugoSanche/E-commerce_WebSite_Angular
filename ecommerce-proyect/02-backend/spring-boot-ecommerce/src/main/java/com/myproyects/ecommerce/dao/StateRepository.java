package com.myproyects.ecommerce.dao;

import com.myproyects.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {

    //code=id of tabla country
    //this work to retrive states for a given country code, path;
    //http://localhost:8080/api/states/search/findByCountryCode?code=MX //search country MX -> Mexico
    List<State> findByCountryCode(@Param("code") String code);

}
