package edu.example.demospring.persitence;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "product")
public class Product implements Serializable {
    private long id;
    private String name;
    private  String price;

    private String final_date;

    public Product(long id, String name, String price, String final_date) {
        this.id=id;
        this.price = price;
        this.name = name;
        this.final_date=final_date;
    }

    public String getFinal_date() {
        return final_date;
    }

    public void setFinal_date(String final_date) {
        this.final_date = final_date;
    }

    public Product() {

    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name= name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

}
