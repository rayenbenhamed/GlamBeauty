package com.glambeauty.dto;

import java.math.BigDecimal;
import java.util.List;

public record PackResponse(
    Long id,
    String name,
    String description,
    BigDecimal price,
    List<ServiceResponse> services,
    List<String> imageUrls
) {
}
