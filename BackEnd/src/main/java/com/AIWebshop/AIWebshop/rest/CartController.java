package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Cart;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.service.CartService;
import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public List<Cart> findCartByUserId(@PathVariable int userId){
        User theUser = userService.findById(userId);
        if (theUser == null){
            throw new RuntimeException("Felhasználó nem létezik");
        }
        List<Cart> carts = cartService.findByUserId(userId);

        if (carts.isEmpty()){
            throw new RuntimeException("A kosár Üres");
        }
        return carts;
    }
}
