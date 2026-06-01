package com.glambeauty.controller;

import com.glambeauty.dto.EstheticianResponse;
import com.glambeauty.service.EstheticianService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/estheticians")
public class EstheticianController {
    private final EstheticianService estheticianService;

    public EstheticianController(EstheticianService estheticianService) {
        this.estheticianService = estheticianService;
    }

    @GetMapping
    public List<EstheticianResponse> getAll() {
        return estheticianService.getAll();
    }

    @GetMapping("/{id}")
    public EstheticianResponse getById(@PathVariable Long id) {
        return estheticianService.getById(id);
    }
}
