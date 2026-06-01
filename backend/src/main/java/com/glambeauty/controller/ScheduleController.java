package com.glambeauty.controller;

import com.glambeauty.domain.User;
import com.glambeauty.dto.ScheduleRequest;
import com.glambeauty.dto.ScheduleResponse;
import com.glambeauty.service.EstheticianService;
import com.glambeauty.service.ScheduleService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/esthetician/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final EstheticianService estheticianService;

    public ScheduleController(ScheduleService scheduleService, EstheticianService estheticianService) {
        this.scheduleService = scheduleService;
        this.estheticianService = estheticianService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ESTHETICIAN')")
    public List<ScheduleResponse> getSchedule(Authentication authentication) {
        Long estheticianId = estheticianService.getProfileByUserId(getUserId(authentication)).getId();
        return scheduleService.getSchedule(estheticianId);
    }

    @PutMapping
    @PreAuthorize("hasRole('ESTHETICIAN')")
    public List<ScheduleResponse> updateSchedule(
        Authentication authentication,
        @Valid @RequestBody List<ScheduleRequest> requests
    ) {
        Long estheticianId = estheticianService.getProfileByUserId(getUserId(authentication)).getId();
        return scheduleService.updateSchedule(estheticianId, requests);
    }

    private Long getUserId(Authentication authentication) {
        return ((User) authentication.getPrincipal()).getId();
    }
}
