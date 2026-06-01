package com.glambeauty.dto;

public record EstheticianResponse(
    Long id,
    String displayName,
    String bio,
    String skills,
    String imageUrl
) {
}
