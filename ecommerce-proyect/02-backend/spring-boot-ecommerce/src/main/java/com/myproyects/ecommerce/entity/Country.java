package com.myproyects.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="country")
@Getter
@Setter
public class Country {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="code")
    private String code;

    @Column(name="name")
    private String name;
    @OneToMany(mappedBy = "country")
    @JsonIgnore
    private List<State> states;


}
