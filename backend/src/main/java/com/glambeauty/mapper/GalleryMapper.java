package com.glambeauty.mapper;

import com.glambeauty.domain.GalleryItem;
import com.glambeauty.dto.GalleryResponse;

public class GalleryMapper {
    private GalleryMapper() {
    }

    public static GalleryResponse toResponse(GalleryItem item) {
        if (item == null) {
            return null;
        }
        return new GalleryResponse(
            item.getId(),
            item.getTitle(),
            item.getCategory(),
            item.getBeforeUrl(),
            item.getAfterUrl(),
            item.getCreatedAt()
        );
    }
}
