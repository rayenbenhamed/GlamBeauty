package com.glambeauty.dto;

import java.math.BigDecimal;
import java.util.List;

public record AdminStatsResponse(
    long totalClients,
    long totalReservations,
    BigDecimal totalRevenue,
    List<ServiceStat> mostRequestedServices,
    List<MonthlyStat> reservationsByMonth,
    double occupancyRate
) {
}
