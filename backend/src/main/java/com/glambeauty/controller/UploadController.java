package com.glambeauty.controller;

import com.glambeauty.service.ImageUploadService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/upload")
public class UploadController {
    private final ImageUploadService imageUploadService;

    public UploadController(ImageUploadService imageUploadService) {
        this.imageUploadService = imageUploadService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public String upload(@RequestParam("file") MultipartFile file, @RequestParam(required = false) String folder) {
        return imageUploadService.upload(file, folder);
    }
}
