package com.glambeauty.dto;

public record UserResponse(
    Long id,
    String email,
    String role,
    boolean enabled
) {
}
