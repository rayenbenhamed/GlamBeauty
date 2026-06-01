package com.glambeauty.dto;

import java.time.Instant;

public record ReviewResponse(
    Long id,
    Integer rating,
    String comment,
    Instant createdAt,
    String clientName
) {
}
