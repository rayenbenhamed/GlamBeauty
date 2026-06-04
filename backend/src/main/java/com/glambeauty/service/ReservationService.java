package com.glambeauty.service;

import com.glambeauty.domain.BeautyService;
import com.glambeauty.domain.ClientProfile;
import com.glambeauty.domain.EstheticianProfile;
import com.glambeauty.domain.Reservation;
import com.glambeauty.domain.enums.ReservationStatus;
import com.glambeauty.dto.ReservationRequest;
import com.glambeauty.dto.ReservationResponse;
import com.glambeauty.exception.BadRequestException;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.ReservationMapper;
import com.glambeauty.repository.BeautyServiceRepository;
import com.glambeauty.repository.ClientProfileRepository;
import com.glambeauty.repository.EstheticianProfileRepository;
import com.glambeauty.repository.ReservationRepository;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ClientProfileRepository clientRepository;
    private final EstheticianProfileRepository estheticianRepository;
    private final BeautyServiceRepository serviceRepository;
    private final NotificationService notificationService;

    public ReservationService(
        ReservationRepository reservationRepository,
        ClientProfileRepository clientRepository,
        EstheticianProfileRepository estheticianRepository,
        BeautyServiceRepository serviceRepository,
        NotificationService notificationService
    ) {
        this.reservationRepository = reservationRepository;
        this.clientRepository = clientRepository;
        this.estheticianRepository = estheticianRepository;
        this.serviceRepository = serviceRepository;
        this.notificationService = notificationService;
    }

    public ReservationResponse createReservation(ReservationRequest request, Long userId) {
        ClientProfile client = clientRepository.findByUserId(userId)
            .orElseThrow(() -> new NotFoundException("Client profile not found"));
        EstheticianProfile esthetician = estheticianRepository.findById(request.estheticianId())
            .orElseThrow(() -> new NotFoundException("Esthetician not found"));
        BeautyService service = serviceRepository.findById(request.serviceId())
            .orElseThrow(() -> new NotFoundException("Service not found"));

        LocalDateTime endTime = request.startTime().plusMinutes(service.getDurationMinutes());

        if (esthetician.getUser().getRole() == null || esthetician.getUser().getRole().getName() != com.glambeauty.domain.enums.RoleName.ESTHETICIAN) {
            throw new BadRequestException("Selected profile is not an esthetician");
        }

        java.time.DayOfWeek day = request.startTime().getDayOfWeek();
        if (day == java.time.DayOfWeek.MONDAY) {
            throw new BadRequestException("The center is closed on Mondays");
        }

        java.time.LocalTime startLocal = request.startTime().toLocalTime();
        java.time.LocalTime endLocal = endTime.toLocalTime();
        if (startLocal.isBefore(java.time.LocalTime.of(10, 0)) || endLocal.isAfter(java.time.LocalTime.of(20, 0))) {
            throw new BadRequestException("Reservations must be within center working hours (Tuesday-Sunday, 10:00 AM to 8:00 PM)");
        }

        boolean overlaps = reservationRepository.existsByEstheticianAndStartTimeLessThanAndEndTimeGreaterThan(
            esthetician,
            endTime,
            request.startTime()
        );
        if (overlaps) {
            throw new BadRequestException("Selected slot is not available");
        }

        Reservation reservation = new Reservation();
        reservation.setClient(client);
        reservation.setEsthetician(esthetician);
        reservation.setService(service);
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setStartTime(request.startTime());
        reservation.setEndTime(endTime);
        reservation.setTotalPrice(service.getPrice());
        reservation.setNotes(request.notes());
        reservation.setCreatedAt(Instant.now());

        Reservation saved = reservationRepository.save(reservation);
        notificationService.notifyReservationCreated(saved);
        return ReservationMapper.toResponse(saved);
    }

    public List<ReservationResponse> getClientReservations(Long userId) {
        return reservationRepository.findByClientUserId(userId).stream()
            .map(ReservationMapper::toResponse)
            .collect(Collectors.toList());
    }

    public List<ReservationResponse> getEstheticianReservations(Long userId) {
        return reservationRepository.findByEstheticianUserId(userId).stream()
            .map(ReservationMapper::toResponse)
            .collect(Collectors.toList());
    }

    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAll().stream()
            .map(ReservationMapper::toResponse)
            .collect(Collectors.toList());
    }

    public ReservationResponse updateStatus(Long reservationId, ReservationStatus status) {
        Reservation reservation = reservationRepository.findById(reservationId)
            .orElseThrow(() -> new NotFoundException("Reservation not found"));
        reservation.setStatus(status);
        Reservation saved = reservationRepository.save(reservation);
        notificationService.notifyReservationStatus(saved);
        return ReservationMapper.toResponse(saved);
    }

    public ReservationResponse cancel(Long reservationId, Long userId) {
        Reservation reservation = reservationRepository.findById(reservationId)
            .orElseThrow(() -> new NotFoundException("Reservation not found"));
        if (!reservation.getClient().getUser().getId().equals(userId)) {
            throw new BadRequestException("Cannot cancel this reservation");
        }
        reservation.setStatus(ReservationStatus.CANCELED);
        Reservation saved = reservationRepository.save(reservation);
        notificationService.notifyReservationStatus(saved);
        return ReservationMapper.toResponse(saved);
    }
}
