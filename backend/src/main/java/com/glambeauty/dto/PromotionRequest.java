package com.glambeauty.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record PromotionRequest(
    @NotBlank String title,
    String description,
    @NotNull BigDecimal discountPercent,
    @NotNull LocalDate startDate,
    @NotNull LocalDate endDate,
    List<String> imageUrls
) {
}
