package com.gms.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import com.gms.model.Product;
import com.gms.model.Category;
import com.gms.model.Inventory;
import com.gms.repository.ProductRepository;
import com.gms.repository.CategoryRepository;
import com.gms.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import com.gms.dto.ProductCreateRequest;
import com.gms.dto.ProductUpdateRequest;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final InventoryService inventoryService;
    private final InventoryRepository inventoryRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Transactional
    public Product createProduct(ProductCreateRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        // Use repository method for efficient lookup
        Product existingProduct = productRepository.findByNameIgnoreCase(request.getName());

        if (existingProduct != null) {
            // If product exists, do not allow duplicate creation
            throw new IllegalArgumentException("Product with name '" + request.getName() + "' already exists.");
        }

        // If product does not exist, create new product first
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(category);
        product.setInventory(null); // Avoid transient reference
        category.addProduct(product);
        categoryRepository.save(category);
        Product savedProduct = productRepository.save(product);
        // Then create inventory and link to product
        Inventory inventory = new Inventory();
        inventory.setProduct(savedProduct);
        inventory.setQuantity(request.getQuantity() != null ? request.getQuantity() : 1);
        inventoryService.createInventory(inventory);
        return savedProduct;
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id: " + id));
    }

    @Transactional
    public Product updateProduct(Long id, ProductUpdateRequest request) {
        Product product = getProductById(id);
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category not found"));
            product.setCategory(category);
        }
        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        Product updatedProduct = productRepository.save(product);

        // Update inventory quantity if provided
        if (request.getQuantity() != null) {
            Inventory inventory = inventoryRepository.findByProductId(product.getId());
            if (inventory != null) {
                inventory.setQuantity(request.getQuantity());
                inventoryRepository.save(inventory);
            }
        }
        return updatedProduct;
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        // Delete associated inventory first
        Inventory inventory = inventoryRepository.findByProductId(product.getId());
        if (inventory != null) {
            inventoryRepository.delete(inventory);
        }
        productRepository.delete(product);
    }
}
