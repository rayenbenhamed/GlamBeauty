package com.glambeauty.mapper;

import com.glambeauty.domain.BeautyService;
import com.glambeauty.dto.ServiceResponse;

public class ServiceMapper {
    private ServiceMapper() {
    }

    public static ServiceResponse toResponse(BeautyService service) {
        if (service == null) {
            return null;
        }
        Long categoryId = service.getCategory() != null ? service.getCategory().getId() : null;
        String categoryName = service.getCategory() != null ? service.getCategory().getName() : null;
        return new ServiceResponse(
            service.getId(),
            service.getName(),
            service.getDescription(),
            service.getPrice(),
            service.getDurationMinutes(),
            categoryId,
            categoryName
        );
    }
}
