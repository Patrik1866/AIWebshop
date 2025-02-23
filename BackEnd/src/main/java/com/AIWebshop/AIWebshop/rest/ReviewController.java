package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.entity.Product;
import com.AIWebshop.AIWebshop.entity.Reviews;
import com.AIWebshop.AIWebshop.service.ProductService;
import com.AIWebshop.AIWebshop.service.ReviewService;
import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;

    @GetMapping
    public List<Reviews> findAll(){
        return reviewService.findAll();
    }

    @GetMapping("/userId/{userId}")
    public List<Reviews> findByUserId(@PathVariable int userId){
        List<Reviews> theReview = reviewService.findByUserId(userId);

        if (theReview.isEmpty()){
            throw new RuntimeException("Nem található vélemény ezzel a felhasználóval");
        }

        return theReview;
    }

    @GetMapping("/productId/{productId}")
    public List<Reviews> findByProductId(@PathVariable int productId){
        List<Reviews> theReview = reviewService.findByProductId(productId);

        if (theReview.isEmpty()){
            throw new RuntimeException("Nem található vélemény ehhez a termékhez");
        }

        return theReview;
    }

    @DeleteMapping("/{reviewId}")
    public String deleteById(@PathVariable int reviewId){
        Reviews theReview = reviewService.findById(reviewId);

        if (theReview == null) throw new RuntimeException("Nem létezik ilyen vélemény");

        reviewService.deleteById(reviewId);

        return "DELETED";
    }

    @PostMapping
    public String save(@RequestBody Reviews review, Principal principal) {

        String username = principal.getName();
        int userId = userService.findByUsername(username).getId();
        Product product = productService.findByProductId(review.getProductId());


        Reviews theReview = new Reviews(userId, product.getId(), review.getPoint(), review.getDescription());

        reviewService.save(theReview);
        return "Saved";
    }
}
