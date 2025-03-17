package com.AIWebshop.AIWebshop.rest;

import com.AIWebshop.AIWebshop.EmailComponent.EmailRequest;
import com.AIWebshop.AIWebshop.EmailComponent.EmailService;
import com.AIWebshop.AIWebshop.entity.Order;
import com.AIWebshop.AIWebshop.entity.OrderItems;
import com.AIWebshop.AIWebshop.entity.Product;
import com.AIWebshop.AIWebshop.req.OrderItemRequest;
import com.AIWebshop.AIWebshop.req.OrderRequest;
import com.AIWebshop.AIWebshop.service.OrderItemsService;
import com.AIWebshop.AIWebshop.service.OrderService;
import com.AIWebshop.AIWebshop.service.ProductService;
import com.AIWebshop.AIWebshop.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemsService orderItemsService;
    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    @GetMapping
    public List<Order> findAll() {
        return orderService.findAll();
    }
    @GetMapping("/{userId}")
    public List<Order> findByUserId(@PathVariable int userId) {
        return orderService.findByUserId(userId);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<?> saveOrder(@RequestBody OrderRequest orderRequest, Principal principal) {
        try {
            Order savedOrder = orderService.save(orderRequest.getOrder());
            System.out.println("Received OrderRequest: " + orderRequest);
            System.out.println("Order: " + orderRequest.getOrder());
            System.out.println("OrderItemRequests: " + orderRequest.getOrderItemRequests());

            if (orderRequest.getOrderItemRequests() != null && !orderRequest.getOrderItemRequests().isEmpty()) {
                for (OrderItemRequest orderItemRequest : orderRequest.getOrderItemRequests()) {
                    Product product = productService.findByProductId(orderItemRequest.getProductId());
                    product.setQuantity(product.getQuantity() - orderItemRequest.getQuantity());
                    productService.save(product);
                    OrderItems orderItem = new OrderItems();
                    orderItem.setOrderId(savedOrder.getId());
                    orderItem.setProductId(orderItemRequest.getProductId());
                    orderItem.setQuantity(orderItemRequest.getQuantity());
                    orderItem.setPrice(orderItemRequest.getPrice());
                    orderItemsService.save(orderItem);
                }

                String emailResponse = sendOrderConfirmationEmail(orderRequest, principal);

                Map<String, Object> response = new HashMap<>();
                response.put("order", savedOrder);
                response.put("emailResponse", emailResponse);

                return ResponseEntity.ok(response);
            } else {
                throw new IllegalArgumentException("Order items list cannot be null or empty");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving order: " + e.getMessage());
        }
    }

    private String sendOrderConfirmationEmail(OrderRequest orderRequest, Principal principal) {
        try {
            String userEmail = userService.findByUsername(principal.getName()).getEmail();

            String emailBody = createOrderConfirmationEmailBody(orderRequest);

            EmailRequest emailRequest = new EmailRequest();
            emailRequest.setFrom("teszttdoga@gmail.com");
            emailRequest.setTo(userEmail);
            emailRequest.setSubject("Order Confirmation - Order #" + orderRequest.getOrder().getId());
            emailRequest.setBody(emailBody);

            emailService.sendMail(emailRequest);

            return "Order confirmation email sent successfully";
        } catch (Exception e) {
            System.err.println("Failed to send order confirmation email: " + e.getMessage());
            return "Failed to send order confirmation email";
        }
    }
    private String createOrderConfirmationEmailBody(OrderRequest orderRequest) {
        StringBuilder body = new StringBuilder();
        body.append("<h2>Köszönjük a rendelését!</h2>");
        body.append("<p>Rendelési adatai:</p>");
        body.append("<ul>");

        double total = 0.0;
        for (OrderItemRequest item : orderRequest.getOrderItemRequests()) {
            Product product = productService.findByProductId(item.getProductId());
            double itemTotal = item.getPrice() * item.getQuantity();
            total += itemTotal;

            body.append("<li>")
                    .append(product.getName())
                    .append(" - Mennyiség: ")
                    .append(item.getQuantity())
                    .append(", Ár: HUF")
                    .append(String.format("%.2f", item.getPrice()))
                    .append(", Összesen: HUF")
                    .append(String.format("%.2f", itemTotal))
                    .append("</li>");
        }
        body.append("</ul>");
        body.append("<p>Összesen: HUF").append(String.format("%.2f", total)).append("</p>");
        body.append("<footer><i>Ez egy automatikusan generált üzenet. Kérem ne válaszoljon!</i></footer>");
        return body.toString();
    }
}
