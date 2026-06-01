package com.glambeauty.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record PromotionResponse(
    Long id,
    String title,
    String description,
    BigDecimal discountPercent,
    LocalDate startDate,
    LocalDate endDate,
    List<String> imageUrls
) {
}
