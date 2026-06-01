package com.glambeauty.dto;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

public record BlogArticleRequest(
    @NotBlank String title,
    String excerpt,
    @NotBlank String content,
    String coverImageUrl,
    Instant publishedAt
) {
}
