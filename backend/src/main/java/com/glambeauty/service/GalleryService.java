package com.glambeauty.service;

import com.glambeauty.domain.GalleryItem;
import com.glambeauty.domain.enums.GalleryCategory;
import com.glambeauty.dto.GalleryRequest;
import com.glambeauty.dto.GalleryResponse;
import com.glambeauty.mapper.GalleryMapper;
import com.glambeauty.repository.GalleryItemRepository;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class GalleryService {
    private final GalleryItemRepository galleryRepository;

    public GalleryService(GalleryItemRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    public List<GalleryResponse> getAll(GalleryCategory category) {
        List<GalleryItem> items = category == null
            ? galleryRepository.findAll()
            : galleryRepository.findByCategory(category);
        return items.stream().map(GalleryMapper::toResponse).collect(Collectors.toList());
    }

    public GalleryResponse create(GalleryRequest request) {
        GalleryItem item = new GalleryItem();
        item.setTitle(request.title());
        item.setCategory(request.category());
        item.setBeforeUrl(request.beforeUrl());
        item.setAfterUrl(request.afterUrl());
        item.setCreatedAt(Instant.now());
        return GalleryMapper.toResponse(galleryRepository.save(item));
    }
}
