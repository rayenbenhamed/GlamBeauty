package com.glambeauty.dto;

public record UserProfileDto(
    Long id,
    String email,
    String role,
    String firstName,
    String lastName,
    String displayName,
    String phone,
    String bio,
    String skills,
    String imageUrl
) {
}
