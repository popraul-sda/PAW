package edu.example.demospring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ProductController {

    @RequestMapping(value = "/view-products")
    public String viewProducts(){
        return "view-products";
    }
    @RequestMapping(value="/add-products")
    public String addProducts(){
        return "add-products";
    }
}
