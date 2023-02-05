package edu.example.demospring.service;

import edu.example.demospring.dao.ProductServiceDAO;
import edu.example.demospring.model.ProductDTO;
import edu.example.demospring.persitence.Product;
import edu.example.demospring.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalTime;

@RestController
public class ProductServiceController {
    private static Map<Long, ProductDTO> productsMap = new HashMap<>();

    final ProductRepository productRepository;

    final ProductServiceDAO productServiceDAO;



    public ProductServiceController(ProductRepository productRepository, ProductServiceDAO productServiceDAO) {
        this.productRepository = productRepository;
        this.productServiceDAO = productServiceDAO;
    }

    @RequestMapping(value = "/products")
    public ResponseEntity<Object> getProducts() {
        return new ResponseEntity<>(productRepository.findAll().stream().map(o -> new ProductDTO(o.getId(), o.getName(),o.getPrice(), o.getFinal_date())).collect(Collectors.toList()), HttpStatus.OK);
    }

    @RequestMapping(value = "/products", method = RequestMethod.POST)
    public ResponseEntity<Object> createProduct(@RequestBody ProductDTO productDTO) {
        productsMap.put(productDTO.getId(), productDTO);
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setFinal_date(productDTO.getFinal_date());
        productRepository.save(product);
        return new ResponseEntity<>("Product created", HttpStatus.OK);
    }

    @RequestMapping(value = "/products_page/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getProduct(@PathVariable("id") Long id) {
        return new ResponseEntity<>(productRepository.findById(id).map(p -> new ProductDTO(p.getId(), p.getName(),p.getPrice(),p.getFinal_date())).orElse(null), HttpStatus.OK);
    }

    @RequestMapping(value = "/products/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateProduct(@PathVariable("id") Long id, @RequestBody ProductDTO productDTO) {
        productRepository.findById(id).ifPresent(p -> {
            p.setPrice(productDTO.getPrice());
            productRepository.save(p);
        });
        productsMap.remove(id);
        productsMap.put(id, productDTO);
        return new ResponseEntity<>("Product updated", HttpStatus.OK);
    }

    @RequestMapping(value = "/products/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteProduct(@PathVariable("id") Long id) {
        ProductDTO remove = productsMap.remove(id);
        productRepository.deleteById(id);
        return new ResponseEntity<>(Optional.ofNullable(remove).map(p -> "Product deleted").orElse("Product not found"), HttpStatus.OK);
    }


    @RequestMapping(value = "/prodEdit/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> prodEdit(@PathVariable("id") Long id) {
        return new ResponseEntity<>(productRepository.findById(id).map(p -> new ProductDTO(p.getId(), p.getName(),p.getPrice(),p.getFinal_date())).orElse(null), HttpStatus.OK);
    }

}
