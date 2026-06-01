package com.glambeauty.controller;

import com.glambeauty.domain.User;
import com.glambeauty.dto.AvailabilityRequest;
import com.glambeauty.dto.AvailabilityResponse;
import com.glambeauty.service.AvailabilityService;
import com.glambeauty.service.EstheticianService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/availability")
public class AvailabilityController {
    private final AvailabilityService availabilityService;
    private final EstheticianService estheticianService;

    public AvailabilityController(AvailabilityService availabilityService, EstheticianService estheticianService) {
        this.availabilityService = availabilityService;
        this.estheticianService = estheticianService;
    }

    @GetMapping("/slots")
    public List<String> getSlots(
        @RequestParam Long estheticianId,
        @RequestParam Long serviceId,
        @RequestParam LocalDate date
    ) {
        return availabilityService.getAvailableSlots(estheticianId, serviceId, date);
    }

    @PostMapping
    @PreAuthorize("hasRole('ESTHETICIAN')")
    public AvailabilityResponse createAvailability(
        Authentication authentication,
        @Valid @RequestBody AvailabilityRequest request
    ) {
        Long estheticianId = estheticianService.getProfileByUserId(getUserId(authentication)).getId();
        return availabilityService.createAvailability(estheticianId, request);
    }

    private Long getUserId(Authentication authentication) {
        return ((User) authentication.getPrincipal()).getId();
    }
}
