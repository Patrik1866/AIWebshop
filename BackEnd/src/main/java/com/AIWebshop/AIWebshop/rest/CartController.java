package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Cart;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.service.CartService;
import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;

    @GetMapping("/cartId/{cartId}")
    public Cart findByCartId(@PathVariable int cartId){
        Cart theCart = cartService.findById(cartId);

        if (theCart == null) throw new RuntimeException("A keresett kosár nem található");

        return theCart;
    }

    @GetMapping("/userId/{userId}")
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

    @DeleteMapping("/{cartId}")
    public String deleteById(@PathVariable int cartId){
        Cart theCart = cartService.findById(cartId);

        if (theCart == null) {
            throw new RuntimeException("A keresett kosár nem található");
        }
        cartService.deleteById(cartId);

        return "DELETED";
    }
}
