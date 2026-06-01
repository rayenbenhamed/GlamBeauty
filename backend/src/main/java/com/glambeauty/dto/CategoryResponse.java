package com.glambeauty.dto;

public record CategoryResponse(
    Long id,
    String name,
    String description,
    String imageUrl
) {
}
