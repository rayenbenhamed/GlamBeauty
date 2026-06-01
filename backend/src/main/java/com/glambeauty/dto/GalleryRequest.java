package com.glambeauty.dto;

import com.glambeauty.domain.enums.GalleryCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record GalleryRequest(
    String title,
    @NotNull GalleryCategory category,
    @NotBlank String beforeUrl,
    @NotBlank String afterUrl
) {
}
