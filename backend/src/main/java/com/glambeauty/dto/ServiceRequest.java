package com.glambeauty.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record ServiceRequest(
    @NotBlank String name,
    String description,
    @NotNull BigDecimal price,
    @NotNull @Min(15) Integer durationMinutes,
    Long categoryId
) {
}
