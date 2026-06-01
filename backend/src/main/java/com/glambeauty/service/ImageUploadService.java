package com.glambeauty.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.glambeauty.exception.BadRequestException;
import java.io.IOException;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageUploadService {
    private final Cloudinary cloudinary;

    public ImageUploadService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String upload(MultipartFile file, String folder) {
        try {
            Map<?, ?> options = folder == null || folder.isBlank()
                ? ObjectUtils.emptyMap()
                : ObjectUtils.asMap("folder", folder);
            Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), options);
            Object url = result.get("secure_url");
            return url != null ? url.toString() : null;
        } catch (IOException ex) {
            throw new BadRequestException("Unable to upload image");
        }
    }
}
