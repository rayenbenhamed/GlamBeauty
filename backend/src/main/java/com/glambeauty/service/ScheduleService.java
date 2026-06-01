package com.glambeauty.service;

import com.glambeauty.domain.EstheticianProfile;
import com.glambeauty.domain.Schedule;
import com.glambeauty.dto.ScheduleRequest;
import com.glambeauty.dto.ScheduleResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.ScheduleMapper;
import com.glambeauty.repository.EstheticianProfileRepository;
import com.glambeauty.repository.ScheduleRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final EstheticianProfileRepository estheticianRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, EstheticianProfileRepository estheticianRepository) {
        this.scheduleRepository = scheduleRepository;
        this.estheticianRepository = estheticianRepository;
    }

    public List<ScheduleResponse> getSchedule(Long estheticianId) {
        return scheduleRepository.findByEstheticianId(estheticianId).stream()
            .map(ScheduleMapper::toResponse)
            .collect(Collectors.toList());
    }

    public List<ScheduleResponse> updateSchedule(Long estheticianId, List<ScheduleRequest> requests) {
        EstheticianProfile esthetician = estheticianRepository.findById(estheticianId)
            .orElseThrow(() -> new NotFoundException("Esthetician not found"));

        List<Schedule> schedules = requests.stream().map(request -> {
            Schedule schedule = scheduleRepository
                .findByEstheticianIdAndDayOfWeek(estheticianId, request.dayOfWeek())
                .orElseGet(Schedule::new);
            schedule.setEsthetician(esthetician);
            schedule.setDayOfWeek(request.dayOfWeek());
            schedule.setStartTime(request.startTime());
            schedule.setEndTime(request.endTime());
            schedule.setEnabled(request.enabled());
            return schedule;
        }).collect(Collectors.toList());

        scheduleRepository.saveAll(schedules);
        return getSchedule(estheticianId);
    }
}
