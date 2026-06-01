package com.glambeauty.dto;

public record AuthResponse(
    String token,
    String role,
    Long userId
) {
}
