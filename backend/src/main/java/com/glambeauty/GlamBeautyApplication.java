package com.glambeauty;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.glambeauty.repository")
@EnableTransactionManagement
public class GlamBeautyApplication {
    public static void main(String[] args) {
        SpringApplication.run(GlamBeautyApplication.class, args);
    }
}
