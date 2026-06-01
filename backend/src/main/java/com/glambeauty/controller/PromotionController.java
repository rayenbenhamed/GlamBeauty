package com.glambeauty.controller;

import com.glambeauty.dto.PromotionRequest;
import com.glambeauty.dto.PromotionResponse;
import com.glambeauty.service.PromotionService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PromotionController {
    private final PromotionService promotionService;

    public PromotionController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @GetMapping("/promotions")
    public List<PromotionResponse> getAll() {
        return promotionService.getAll();
    }

    @GetMapping("/promotions/{id}")
    public PromotionResponse getById(@PathVariable Long id) {
        return promotionService.getById(id);
    }

    @PostMapping("/admin/promotions")
    @PreAuthorize("hasRole('ADMIN')")
    public PromotionResponse create(@Valid @RequestBody PromotionRequest request) {
        return promotionService.create(request);
    }

    @PutMapping("/admin/promotions/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PromotionResponse update(@PathVariable Long id, @Valid @RequestBody PromotionRequest request) {
        return promotionService.update(id, request);
    }

    @DeleteMapping("/admin/promotions/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        promotionService.delete(id);
    }
}
