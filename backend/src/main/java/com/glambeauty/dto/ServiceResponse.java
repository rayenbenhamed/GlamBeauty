package com.glambeauty.dto;

import java.math.BigDecimal;

public record ServiceResponse(
    Long id,
    String name,
    String description,
    BigDecimal price,
    Integer durationMinutes,
    Long categoryId,
    String categoryName
) {
}
