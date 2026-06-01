package com.glambeauty.dto;

import java.time.Instant;

public record BlogArticleResponse(
    Long id,
    String title,
    String excerpt,
    String content,
    String coverImageUrl,
    Instant publishedAt,
    Instant createdAt
) {
}
