package com.AIWebshop.AIWebshop.EmailComponent;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    public void sendMail(EmailRequest emailRequest) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");


            helper.setFrom(emailRequest.getFrom());
            helper.setReplyTo(emailRequest.getTo()); // Dynamic sender's email
            helper.setTo(emailRequest.getTo());
            helper.setSubject(emailRequest.getSubject());

            String enhancedBody = String.format(
                    "<p><strong>Message from:</strong> %s</p>" +
                            "<p>%s</p>",
                    emailRequest.getFrom(),
                    emailRequest.getBody()
            );

            helper.setText(enhancedBody, true);
            mailSender.send(message);

            logger.info("Email sent successfully");
        } catch (Exception e) {
            logger.error("Failed to send email", e);
            throw new RuntimeException("Failed to send email: " + e.getMessage(), e);
        }
    }
}