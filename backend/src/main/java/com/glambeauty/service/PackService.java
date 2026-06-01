package com.glambeauty.service;

import com.glambeauty.domain.BeautyService;
import com.glambeauty.domain.Pack;
import com.glambeauty.dto.PackRequest;
import com.glambeauty.dto.PackResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.PackMapper;
import com.glambeauty.repository.BeautyServiceRepository;
import com.glambeauty.repository.PackRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PackService {
    private final PackRepository packRepository;
    private final BeautyServiceRepository serviceRepository;

    public PackService(PackRepository packRepository, BeautyServiceRepository serviceRepository) {
        this.packRepository = packRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<PackResponse> getAll() {
        return packRepository.findAll().stream()
            .map(PackMapper::toResponse)
            .collect(Collectors.toList());
    }

    public PackResponse getById(Long id) {
        Pack pack = packRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Pack not found"));
        return PackMapper.toResponse(pack);
    }

    public PackResponse create(PackRequest request) {
        Pack pack = new Pack();
        pack.setName(request.name());
        pack.setDescription(request.description());
        pack.setPrice(request.price());
        if (request.serviceIds() != null && !request.serviceIds().isEmpty()) {
            List<BeautyService> services = serviceRepository.findAllById(request.serviceIds());
            pack.setServices(services);
        }
        if (request.imageUrls() != null) {
            pack.setImageUrls(request.imageUrls());
        }
        return PackMapper.toResponse(packRepository.save(pack));
    }

    public PackResponse update(Long id, PackRequest request) {
        Pack pack = packRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Pack not found"));
        pack.setName(request.name());
        pack.setDescription(request.description());
        pack.setPrice(request.price());
        if (request.serviceIds() != null) {
            List<BeautyService> services = serviceRepository.findAllById(request.serviceIds());
            pack.setServices(services);
        }
        if (request.imageUrls() != null) {
            pack.setImageUrls(request.imageUrls());
        }
        return PackMapper.toResponse(packRepository.save(pack));
    }

    public void delete(Long id) {
        if (!packRepository.existsById(id)) {
            throw new NotFoundException("Pack not found");
        }
        packRepository.deleteById(id);
    }
}
