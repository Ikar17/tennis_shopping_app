package com.app.controller;

import com.app.dto.ProductDTO;
import com.app.model.Category;
import com.app.model.Product;
import com.app.repository.ProductRepository;
import com.app.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<Product> getProductById(@RequestParam Integer id){
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()){
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Product>> getProductByName(@RequestParam String name){
        int limit = 10;
        Page<Product> products = productRepository.findByNameContainingIgnoreCase(name,PageRequest.of(0, limit));
        if(products != null){
            return new ResponseEntity<>(products, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/last/{limit}")
    public ResponseEntity<List<Product>> getLastAddedProducts(@PathVariable Integer limit){
        List<Product> products = productRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, limit));
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<Page<Product>> getAllProductsByCategory(@RequestParam String category,
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10") int size){
        Page<Product> productsPage = productRepository.findByCategory_Name(category, PageRequest.of(page, size));
        if (productsPage.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(productsPage, HttpStatus.OK);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNewProduct(@RequestBody ProductDTO productDTO){
        Optional<Category> category = categoryRepository.findByNameIgnoreCase(productDTO.getCategory());
        if(category.isEmpty()){
            return new ResponseEntity<>("Not found category", HttpStatus.NOT_ACCEPTABLE);
        }

        Product product = Product.builder()
                .name(productDTO.getName())
                .category(category.get())
                .available(productDTO.getAvailable())
                .price(productDTO.getPrice())
                .quantity(productDTO.getQuantity())
                .image(productDTO.getImage())
                .build();
        productRepository.save(product);

        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<String> updateProduct(@RequestParam int id,
                                                @RequestBody ProductDTO productDTO){
        Optional<Product> productOptional = productRepository.findById(id);
        if(productOptional.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Product product = productOptional.get();
        if(productDTO.getAvailable() != null) product.setAvailable(productDTO.getAvailable());
        if(productDTO.getPrice() != null) product.setPrice(productDTO.getPrice());
        if(productDTO.getName() != null) product.setName(productDTO.getName());
        if(productDTO.getQuantity() != null) product.setQuantity(productDTO.getQuantity());
        if(productDTO.getImage() != null && !productDTO.getImage().equals("")) product.setImage(productDTO.getImage());
        if(productDTO.getCategory() != null){
            Optional<Category> category = categoryRepository.findByNameIgnoreCase(productDTO.getCategory());
            if(category.isPresent()) product.setCategory(category.get());
        }

        productRepository.save(product);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}