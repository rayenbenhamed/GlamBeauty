package com.glambeauty.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.glambeauty.domain.Availability;
import com.glambeauty.domain.BeautyService;
import com.glambeauty.domain.EstheticianProfile;
import com.glambeauty.domain.Reservation;
import com.glambeauty.domain.Schedule;
import com.glambeauty.domain.enums.AvailabilityType;
import com.glambeauty.dto.AvailabilityRequest;
import com.glambeauty.dto.AvailabilityResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.AvailabilityMapper;
import com.glambeauty.repository.AvailabilityRepository;
import com.glambeauty.repository.BeautyServiceRepository;
import com.glambeauty.repository.EstheticianProfileRepository;
import com.glambeauty.repository.ReservationRepository;
import com.glambeauty.repository.ScheduleRepository;

@Service
@Transactional(readOnly = true)
public class AvailabilityService {
    private final AvailabilityRepository availabilityRepository;
    private final ScheduleRepository scheduleRepository;
    private final ReservationRepository reservationRepository;
    private final EstheticianProfileRepository estheticianRepository;
    private final BeautyServiceRepository serviceRepository;

    public AvailabilityService(
        AvailabilityRepository availabilityRepository,
        ScheduleRepository scheduleRepository,
        ReservationRepository reservationRepository,
        EstheticianProfileRepository estheticianRepository,
        BeautyServiceRepository serviceRepository
    ) {
        this.availabilityRepository = availabilityRepository;
        this.scheduleRepository = scheduleRepository;
        this.reservationRepository = reservationRepository;
        this.estheticianRepository = estheticianRepository;
        this.serviceRepository = serviceRepository;
    }

    @Transactional
    public AvailabilityResponse createAvailability(Long estheticianId, AvailabilityRequest request) {
        EstheticianProfile esthetician = estheticianRepository.findById(estheticianId)
            .orElseThrow(() -> new NotFoundException("Esthetician not found"));

        Availability availability = new Availability();
        availability.setEsthetician(esthetician);
        availability.setDate(request.date());
        availability.setStartTime(request.startTime());
        availability.setEndTime(request.endTime());
        availability.setType(request.type());
        availability.setReason(request.reason());

        return AvailabilityMapper.toResponse(availabilityRepository.save(availability));
    }

    public List<String> getAvailableSlots(Long estheticianId, Long serviceId, LocalDate date) {
        EstheticianProfile esthetician = estheticianRepository.findById(estheticianId)
            .orElseThrow(() -> new NotFoundException("Esthetician not found"));
        BeautyService service = serviceRepository.findById(serviceId)
            .orElseThrow(() -> new NotFoundException("Service not found"));

        List<Schedule> schedules = scheduleRepository.findByEstheticianId(estheticianId);
        Schedule daySchedule = schedules.stream()
            .filter(schedule -> schedule.getDayOfWeek().equals(date.getDayOfWeek()) && schedule.isEnabled())
            .findFirst()
            .orElse(null);

        LocalTime start = daySchedule != null ? daySchedule.getStartTime() : LocalTime.of(9, 0);
        LocalTime end = daySchedule != null ? daySchedule.getEndTime() : LocalTime.of(17, 0);

        List<Availability> availability = availabilityRepository.findByEstheticianIdAndDate(estheticianId, date);
        List<Reservation> reservations = reservationRepository.findAll().stream()
            .filter(res -> res.getEsthetician().getId().equals(esthetician.getId()))
            .filter(res -> res.getStartTime().toLocalDate().equals(date))
            .collect(Collectors.toList());

        return generateSlots(date, start, end, service.getDurationMinutes(), reservations, availability);
    }

    private List<String> generateSlots(
        LocalDate date,
        LocalTime start,
        LocalTime end,
        int durationMinutes,
        List<Reservation> reservations,
        List<Availability> availability
    ) {
        List<String> slots = new ArrayList<>();
        LocalTime cursor = start;
        while (!cursor.plusMinutes(durationMinutes).isAfter(end)) {
            LocalTime slotStartTime = cursor;
            LocalTime slotEndTime = cursor.plusMinutes(durationMinutes);
            LocalDateTime slotStart = LocalDateTime.of(date, slotStartTime);
            LocalDateTime slotEnd = LocalDateTime.of(date, slotEndTime);

            boolean overlapsReservation = reservations.stream().anyMatch(res ->
                res.getStartTime().isBefore(slotEnd) && res.getEndTime().isAfter(slotStart)
            );
            boolean blocked = availability.stream().anyMatch(block ->
                block.getType() != AvailabilityType.AVAILABLE
                    && !block.getStartTime().isAfter(slotStartTime)
                    && !block.getEndTime().isBefore(slotEndTime)
            );

            if (!overlapsReservation && !blocked) {
                slots.add(slotStartTime.toString());
            }

            cursor = cursor.plusMinutes(15);
        }
        return slots;
    }
}
