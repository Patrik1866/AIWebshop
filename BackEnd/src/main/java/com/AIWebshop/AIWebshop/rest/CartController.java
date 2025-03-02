package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Cart;
import com.AIWebshop.AIWebshop.entity.CartView;
import com.AIWebshop.AIWebshop.entity.Product;
import com.AIWebshop.AIWebshop.entity.User;
import com.AIWebshop.AIWebshop.req.CartRequest;
import com.AIWebshop.AIWebshop.service.CartService;
import com.AIWebshop.AIWebshop.service.CartViewService;
import com.AIWebshop.AIWebshop.service.ProductService;
import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @Autowired
    private UserService userService;
    @Autowired
    private ProductService productService;
    @Autowired
    private CartViewService cartViewService;

    @GetMapping
    public List<Cart> findAll(){
        return cartService.findAll();
    }

    @GetMapping("/cartId/{cartId}")
    public Cart findByCartId(@PathVariable int cartId){
        Cart theCart = cartService.findById(cartId);

        if (theCart == null) throw new RuntimeException("A keresett kosár nem található");

        return theCart;
    }

    @GetMapping("/userId/{userId}")
    public List<CartView> findCartByUserId(@PathVariable int userId){
        User theUser = userService.findById(userId);
        if (theUser == null){
            throw new RuntimeException("Felhasználó nem létezik");
        }
        List<CartView> carts = cartViewService.findByUserId(userId);

        if (carts.isEmpty()){
            return Collections.emptyList(); // vagy egy üzenetet adhatunk vissza, pl. "A kosár üres"
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

    @PostMapping("/save")
    public void saveCart(@RequestBody CartRequest cartRequest, Principal principal) {
        String username = principal.getName();
        User user = userService.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Product product = productService.findByProductId(cartRequest.getProduct());

        Cart cart = new Cart(user.getId(), product, cartRequest.getQuantity());

        cartService.saveCart(cart);
    }

}
