package com.glambeauty.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ReservationResponse(
    Long id,
    String status,
    LocalDateTime startTime,
    LocalDateTime endTime,
    BigDecimal totalPrice,
    String serviceName,
    String estheticianName
) {
}
