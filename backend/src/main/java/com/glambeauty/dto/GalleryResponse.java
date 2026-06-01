package com.glambeauty.dto;

import com.glambeauty.domain.enums.GalleryCategory;
import java.time.Instant;

public record GalleryResponse(
    Long id,
    String title,
    GalleryCategory category,
    String beforeUrl,
    String afterUrl,
    Instant createdAt
) {
}
