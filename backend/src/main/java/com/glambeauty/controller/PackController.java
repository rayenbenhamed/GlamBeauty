package com.glambeauty.controller;

import com.glambeauty.dto.PackRequest;
import com.glambeauty.dto.PackResponse;
import com.glambeauty.service.PackService;
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
public class PackController {
    private final PackService packService;

    public PackController(PackService packService) {
        this.packService = packService;
    }

    @GetMapping("/packs")
    public List<PackResponse> getAll() {
        return packService.getAll();
    }

    @GetMapping("/packs/{id}")
    public PackResponse getById(@PathVariable Long id) {
        return packService.getById(id);
    }

    @PostMapping("/admin/packs")
    @PreAuthorize("hasRole('ADMIN')")
    public PackResponse create(@Valid @RequestBody PackRequest request) {
        return packService.create(request);
    }

    @PutMapping("/admin/packs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PackResponse update(@PathVariable Long id, @Valid @RequestBody PackRequest request) {
        return packService.update(id, request);
    }

    @DeleteMapping("/admin/packs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        packService.delete(id);
    }
}
