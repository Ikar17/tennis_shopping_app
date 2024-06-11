package com.app.controller;

import com.app.dto.OrderDetailsDTO;
import com.app.model.OrderDetails;
import com.app.model.OrderProduct;
import com.app.model.Product;
import com.app.model.User;
import com.app.repository.OrderProductRepository;
import com.app.repository.OrderRepository;
import com.app.repository.ProductRepository;
import com.app.repository.UserRepository;
import com.app.utils.OrderStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderProductRepository orderProductRepository;

    @PostMapping
    public ResponseEntity<Integer> createNewOrder(@RequestBody OrderDetailsDTO orderDetailsDTO){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());
            if(optionalUser.isEmpty()) return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            User user = optionalUser.get();

            OrderDetails orderDetails = new OrderDetails();
            orderDetails.setUser(user);
            orderDetails.setOrderStatus(OrderStatus.UTWORZONE);
            orderDetails.setProducts(new ArrayList<>());

            for(Integer id : orderDetailsDTO.getProductsId()){
                Optional<Product> productOptional = productRepository.findById(id);
                if(productOptional.isPresent()){
                    Product product = productOptional.get();
                    OrderProduct orderProduct = OrderProduct
                            .builder()
                            .price(product.getPrice())
                            .name(product.getName())
                            .build();
                    orderProductRepository.save(orderProduct);
                    orderDetails.getProducts().add(orderProduct);
                }
            }

            OrderDetails savedOrder = orderRepository.save(orderDetails);
            return new ResponseEntity<>(savedOrder.getId(), HttpStatus.CREATED);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<Page<OrderDetails>> getOrdersByUser(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());
            if(optionalUser.isEmpty()) return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            User user = optionalUser.get();

            Page<OrderDetails> orders = orderRepository.findByUser(user, PageRequest.of(page, size));
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Page<OrderDetails>> getAllOrders(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "10") int size){
        try{
            Page<OrderDetails> orders = orderRepository.findAll(PageRequest.of(page, size));
            return new ResponseEntity<>(orders, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping
    public ResponseEntity<String> updateOrder(@RequestBody OrderDetails orderDetails){
        try{
            Optional<OrderDetails> orderOptional = orderRepository.findById(orderDetails.getId());
            if(orderOptional.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            OrderDetails order = orderOptional.get();
            if(orderDetails.getOrderStatus() != null) order.setOrderStatus(orderDetails.getOrderStatus());
            orderRepository.save(order);

            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}