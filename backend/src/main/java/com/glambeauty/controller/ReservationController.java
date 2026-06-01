package com.glambeauty.controller;

import com.glambeauty.domain.User;
import com.glambeauty.domain.enums.ReservationStatus;
import com.glambeauty.dto.ReservationRequest;
import com.glambeauty.dto.ReservationResponse;
import com.glambeauty.service.ReservationService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/reservations")
    @PreAuthorize("hasRole('CLIENT')")
    public ReservationResponse create(@Valid @RequestBody ReservationRequest request, Authentication authentication) {
        return reservationService.createReservation(request, getUserId(authentication));
    }

    @GetMapping("/reservations/my")
    @PreAuthorize("hasRole('CLIENT')")
    public List<ReservationResponse> getMyReservations(Authentication authentication) {
        return reservationService.getClientReservations(getUserId(authentication));
    }

    @GetMapping("/esthetician/reservations")
    @PreAuthorize("hasRole('ESTHETICIAN')")
    public List<ReservationResponse> getEstheticianReservations(Authentication authentication) {
        return reservationService.getEstheticianReservations(getUserId(authentication));
    }

    @GetMapping("/admin/reservations")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReservationResponse> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @PutMapping("/admin/reservations/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ReservationResponse updateStatusAdmin(@PathVariable Long id, @RequestParam ReservationStatus status) {
        return reservationService.updateStatus(id, status);
    }

    @PutMapping("/esthetician/reservations/{id}/status")
    @PreAuthorize("hasRole('ESTHETICIAN')")
    public ReservationResponse updateStatusEsthetician(@PathVariable Long id, @RequestParam ReservationStatus status) {
        return reservationService.updateStatus(id, status);
    }

    @PutMapping("/reservations/{id}/cancel")
    @PreAuthorize("hasRole('CLIENT')")
    public ReservationResponse cancel(@PathVariable Long id, Authentication authentication) {
        return reservationService.cancel(id, getUserId(authentication));
    }

    private Long getUserId(Authentication authentication) {
        return ((User) authentication.getPrincipal()).getId();
    }
}
