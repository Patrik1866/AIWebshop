package com.AIWebshop.AIWebshop.EmailComponent;

import com.AIWebshop.AIWebshop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;

    @PostMapping
    public String sendEmail(@RequestBody EmailRequest emailRequest, Principal principal) throws Exception {
        System.out.println("EmailRequest: " + emailRequest.getFrom());
        System.out.println("Principal: " + principal.getName());

        emailRequest.setFrom(userService.findByUsername(principal.getName()).getEmail());

        System.out.println("Updated EmailRequest: " + emailRequest);

        emailService.sendMail(emailRequest);

        return "Email sent successfully.";
    }

}

