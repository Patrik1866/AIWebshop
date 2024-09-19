package com.AIWebshop.AIWebshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AiWebshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(AiWebshopApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfig(){
		return new WebMvcConfigurer() {
			public void addCorsMapping(CorsRegistry reg){
				reg.addMapping("/api/**")
						.allowedOrigins("http://localhost:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}
}
