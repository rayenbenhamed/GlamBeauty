package com.glambeauty.mapper;

import com.glambeauty.domain.Reservation;
import com.glambeauty.dto.ReservationResponse;

public class ReservationMapper {
    private ReservationMapper() {
    }

    public static ReservationResponse toResponse(Reservation reservation) {
        if (reservation == null) {
            return null;
        }
        String serviceName = reservation.getService() != null ? reservation.getService().getName() : null;
        String estheticianName = reservation.getEsthetician() != null ? reservation.getEsthetician().getDisplayName() : null;
        return new ReservationResponse(
            reservation.getId(),
            reservation.getStatus().name(),
            reservation.getStartTime(),
            reservation.getEndTime(),
            reservation.getTotalPrice(),
            serviceName,
            estheticianName
        );
    }
}
