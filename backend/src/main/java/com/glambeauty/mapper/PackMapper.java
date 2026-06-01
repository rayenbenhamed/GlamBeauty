package com.glambeauty.mapper;

import com.glambeauty.domain.Pack;
import com.glambeauty.dto.PackResponse;
import com.glambeauty.dto.ServiceResponse;
import java.util.List;
import java.util.stream.Collectors;

public class PackMapper {
    private PackMapper() {
    }

    public static PackResponse toResponse(Pack pack) {
        if (pack == null) {
            return null;
        }
        List<ServiceResponse> services = pack.getServices() == null ? List.of() : pack.getServices()
            .stream()
            .map(ServiceMapper::toResponse)
            .collect(Collectors.toList());

        return new PackResponse(
            pack.getId(),
            pack.getName(),
            pack.getDescription(),
            pack.getPrice(),
            services,
            pack.getImageUrls()
        );
    }
}
