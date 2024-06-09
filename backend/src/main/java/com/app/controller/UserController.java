package com.app.controller;

import com.app.model.User;
import com.app.repository.UserRepository;
import com.app.utils.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public ResponseEntity<Page<User>> getAllUsers(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "10") int size){
        try{
            Page<User> users = userRepository.findAll(PageRequest.of(page,size));
            return new ResponseEntity<>(users, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/details")
    public ResponseEntity<User> getUserDetails(){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());
            return new ResponseEntity<>(optionalUser.get(), HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/promote")
    public ResponseEntity<String> promoteToAdmin(@RequestBody User user){
        try{
            if(user.getEmail() == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            Optional<User> userOptional = userRepository.findByEmail(user.getEmail());
            if(userOptional.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            User userFromDB = userOptional.get();
            userFromDB.setRole(Role.ADMIN);
            userRepository.save(userFromDB);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/details")
    public ResponseEntity<String> updateData(@RequestBody User updatedUser){
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Optional<User> optionalUser = userRepository.findByEmail(authentication.getName());
            if(optionalUser.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            User user = optionalUser.get();

            if(updatedUser.getFirstname() != null) user.setFirstname(updatedUser.getFirstname());
            if(updatedUser.getLastname() != null) user.setLastname(updatedUser.getLastname());
            if(updatedUser.getAddress() != null) user.setAddress(updatedUser.getAddress());
            if(updatedUser.getNumber() != null) user.setNumber(updatedUser.getNumber());

            userRepository.save(user);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
