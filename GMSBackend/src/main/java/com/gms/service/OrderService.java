package com.gms.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import com.gms.model.Order;
import com.gms.model.OrderItem;
import com.gms.model.Inventory;
import com.gms.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final InventoryService inventoryService;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + id));
    }

    public List<Order> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return orderRepository.findByOrderDateBetween(startDate, endDate);
    }

    public List<Order> getOrdersByStatus(Order.OrderStatus status) {
        return orderRepository.findByStatus(status);
    }

    @Transactional
    public Order createOrder(Order order) {
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.PENDING);

        for (OrderItem item : order.getItems()) {
            Inventory inventory = inventoryService.getInventoryByProductId(item.getProduct().getId());
            inventoryService.updateStock(inventory.getId(), -item.getQuantity());
        }

        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrderStatus(Long id, Order.OrderStatus status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }

    @Transactional
    public void deleteOrder(Long id) {
        Order order = getOrderById(id);

        if (order.getStatus() != Order.OrderStatus.COMPLETED) {
            for (OrderItem item : order.getItems()) {
                Inventory inventory = inventoryService.getInventoryByProductId(item.getProduct().getId());
                inventoryService.updateStock(inventory.getId(), item.getQuantity());
            }
        }

        orderRepository.deleteById(id);
    }
}
