package com.gms.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import com.gms.model.Inventory;
import com.gms.repository.InventoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory getInventoryById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Inventory not found with id: " + id));
    }

    public Inventory getInventoryByProductId(Long productId) {
        Inventory inventory = inventoryRepository.findByProductId(productId);
        if (inventory == null) {
            throw new EntityNotFoundException("Inventory not found for product id: " + productId);
        }
        return inventory;
    }

    @Transactional
    public Inventory createInventory(Inventory inventory) {
        Inventory existingInventory = inventoryRepository.findByProductId(inventory.getProduct().getId());
        if (existingInventory != null) {
            // If inventory exists, update the quantity
            existingInventory.setQuantity(existingInventory.getQuantity() + inventory.getQuantity());
            return inventoryRepository.save(existingInventory);
        }
        // If not exists, create new inventory
        return inventoryRepository.save(inventory);
    }

    @Transactional
    public Inventory updateInventory(Long id, Inventory inventoryDetails) {
        Inventory inventory = getInventoryById(id);
        // Optionally, check if product is being changed and handle accordingly
        inventory.setQuantity(inventoryDetails.getQuantity());
        return inventoryRepository.save(inventory);
    }

    @Transactional
    public Inventory updateStock(Long id, Integer quantityChange) {
        Inventory inventory = getInventoryById(id);
        int newQuantity = inventory.getQuantity() + quantityChange;

        if (newQuantity < 0) {
            throw new IllegalArgumentException("Insufficient stock");
        }

        inventory.setQuantity(newQuantity);
        return inventoryRepository.save(inventory);
    }

    @Transactional
    public void deleteInventory(Long id) {
        if (!inventoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Inventory not found with id: " + id);
        }
        inventoryRepository.deleteById(id);
    }
}
