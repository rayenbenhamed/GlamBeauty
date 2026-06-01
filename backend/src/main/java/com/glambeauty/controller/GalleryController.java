package com.glambeauty.controller;

import com.glambeauty.domain.enums.GalleryCategory;
import com.glambeauty.dto.GalleryRequest;
import com.glambeauty.dto.GalleryResponse;
import com.glambeauty.service.GalleryService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {
    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @GetMapping
    public List<GalleryResponse> getAll(@RequestParam(required = false) GalleryCategory category) {
        return galleryService.getAll(category);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public GalleryResponse create(@Valid @RequestBody GalleryRequest request) {
        return galleryService.create(request);
    }
}
