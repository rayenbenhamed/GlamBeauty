package com.glambeauty.service;

import com.glambeauty.domain.EstheticianProfile;
import com.glambeauty.dto.EstheticianResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.EstheticianMapper;
import com.glambeauty.repository.EstheticianProfileRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EstheticianService {
    private final EstheticianProfileRepository estheticianRepository;

    public EstheticianService(EstheticianProfileRepository estheticianRepository) {
        this.estheticianRepository = estheticianRepository;
    }

    public List<EstheticianResponse> getAll() {
        return estheticianRepository.findAll().stream()
            .map(EstheticianMapper::toResponse)
            .collect(Collectors.toList());
    }

    public EstheticianResponse getById(Long id) {
        EstheticianProfile profile = estheticianRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Esthetician not found"));
        return EstheticianMapper.toResponse(profile);
    }

    public EstheticianProfile getProfileByUserId(Long userId) {
        return estheticianRepository.findByUserId(userId)
            .orElseThrow(() -> new NotFoundException("Esthetician not found"));
    }
}
