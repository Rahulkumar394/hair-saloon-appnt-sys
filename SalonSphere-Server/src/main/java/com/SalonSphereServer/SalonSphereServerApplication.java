package com.SalonSphereServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SalonSphereServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SalonSphereServerApplication.class, args);
	}
}
