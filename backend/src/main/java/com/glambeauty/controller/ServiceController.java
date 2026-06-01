package com.glambeauty.controller;

import com.glambeauty.dto.ServiceRequest;
import com.glambeauty.dto.ServiceResponse;
import com.glambeauty.service.ServiceCatalogService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ServiceController {
    private final ServiceCatalogService serviceCatalogService;

    public ServiceController(ServiceCatalogService serviceCatalogService) {
        this.serviceCatalogService = serviceCatalogService;
    }

    @GetMapping("/services")
    public List<ServiceResponse> getAll(@RequestParam(required = false) Long categoryId) {
        return serviceCatalogService.getAll(categoryId);
    }

    @GetMapping("/services/{id}")
    public ServiceResponse getById(@PathVariable Long id) {
        return serviceCatalogService.getById(id);
    }

    @PostMapping("/admin/services")
    @PreAuthorize("hasRole('ADMIN')")
    public ServiceResponse create(@Valid @RequestBody ServiceRequest request) {
        return serviceCatalogService.create(request);
    }

    @PutMapping("/admin/services/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ServiceResponse update(@PathVariable Long id, @Valid @RequestBody ServiceRequest request) {
        return serviceCatalogService.update(id, request);
    }

    @DeleteMapping("/admin/services/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        serviceCatalogService.delete(id);
    }
}
