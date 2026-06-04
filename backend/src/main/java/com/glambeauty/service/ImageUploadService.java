package com.glambeauty.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.glambeauty.exception.BadRequestException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageUploadService {
    private final Cloudinary cloudinary;
    
    @org.springframework.beans.factory.annotation.Value("${app.cloudinary.cloud-name:}")
    private String cloudName;

    public ImageUploadService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String upload(MultipartFile file, String folder) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        if (cloudName == null || cloudName.isBlank() || cloudName.contains("CLOUDINARY")) {
            // Local file fallback
            try {
                String originalFilename = file.getOriginalFilename();
                String ext = "";
                if (originalFilename != null && originalFilename.contains(".")) {
                    ext = originalFilename.substring(originalFilename.lastIndexOf("."));
                }
                String filename = UUID.randomUUID().toString() + ext;
                Path uploadDir = Paths.get("uploads");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filePath = uploadDir.resolve(filename);
                Files.copy(file.getInputStream(), filePath);
                return "http://localhost:8081/api/uploads/" + filename;
            } catch (IOException e) {
                throw new BadRequestException("Failed to store file locally: " + e.getMessage());
            }
        }
        try {
            Map<?, ?> options = folder == null || folder.isBlank()
                ? ObjectUtils.emptyMap()
                : ObjectUtils.asMap("folder", folder);
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), options);
            Object url = result.get("secure_url");
            return url != null ? url.toString() : null;
        } catch (IOException ex) {
            throw new BadRequestException("Unable to upload image: " + ex.getMessage());
        }
    }
}
