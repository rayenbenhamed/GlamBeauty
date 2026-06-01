package com.glambeauty.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

public record PackRequest(
    @NotBlank String name,
    String description,
    @NotNull BigDecimal price,
    List<Long> serviceIds,
    List<String> imageUrls
) {
}
