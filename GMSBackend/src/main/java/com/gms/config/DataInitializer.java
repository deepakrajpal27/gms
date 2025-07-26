package com.gms.config;

import com.gms.model.Category;
import com.gms.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {
    @Bean
    public CommandLineRunner initCategories(CategoryRepository categoryRepository) {
        return args -> {
            List<String> defaultCategories = Arrays.asList("fruits", "vegetables", "beverages");
            for (String name : defaultCategories) {
                if (!categoryRepository.existsByNameIgnoreCase(name)) {
                    Category category = new Category();
                    category.setName(name);
                    category.setDescription(name.substring(0, 1).toUpperCase() + name.substring(1));
                    categoryRepository.save(category);
                }
            }
        };
    }
}

