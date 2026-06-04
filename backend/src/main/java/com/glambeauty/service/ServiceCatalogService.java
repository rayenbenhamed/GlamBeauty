package com.glambeauty.service;

import com.glambeauty.domain.BeautyService;
import com.glambeauty.domain.ServiceCategory;
import com.glambeauty.dto.ServiceRequest;
import com.glambeauty.dto.ServiceResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.ServiceMapper;
import com.glambeauty.repository.BeautyServiceRepository;
import com.glambeauty.repository.ServiceCategoryRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ServiceCatalogService {
    private final BeautyServiceRepository serviceRepository;
    private final ServiceCategoryRepository categoryRepository;
    private final com.glambeauty.repository.EstheticianProfileRepository estheticianRepository;
    private final com.glambeauty.repository.ReviewRepository reviewRepository;

    public ServiceCatalogService(
        BeautyServiceRepository serviceRepository, 
        ServiceCategoryRepository categoryRepository,
        com.glambeauty.repository.EstheticianProfileRepository estheticianRepository,
        com.glambeauty.repository.ReviewRepository reviewRepository
    ) {
        this.serviceRepository = serviceRepository;
        this.categoryRepository = categoryRepository;
        this.estheticianRepository = estheticianRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<ServiceResponse> getAll(Long categoryId) {
        List<BeautyService> services = categoryId == null
            ? serviceRepository.findAll()
            : serviceRepository.findByCategoryId(categoryId);
        return services.stream().map(ServiceMapper::toResponse).collect(Collectors.toList());
    }

    public ServiceResponse getById(Long id) {
        BeautyService service = serviceRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Service not found"));
        return ServiceMapper.toResponse(service);
    }

    public ServiceResponse create(ServiceRequest request) {
        BeautyService service = new BeautyService();
        service.setName(request.name());
        service.setDescription(request.description());
        service.setPrice(request.price());
        service.setDurationMinutes(request.durationMinutes());
        if (request.categoryId() != null) {
            ServiceCategory category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new NotFoundException("Category not found"));
            service.setCategory(category);
        }
        return ServiceMapper.toResponse(serviceRepository.save(service));
    }

    public ServiceResponse update(Long id, ServiceRequest request) {
        BeautyService service = serviceRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Service not found"));
        service.setName(request.name());
        service.setDescription(request.description());
        service.setPrice(request.price());
        service.setDurationMinutes(request.durationMinutes());
        if (request.categoryId() != null) {
            ServiceCategory category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new NotFoundException("Category not found"));
            service.setCategory(category);
        }
        return ServiceMapper.toResponse(serviceRepository.save(service));
    }

    public void delete(Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new NotFoundException("Service not found");
        }
        serviceRepository.deleteById(id);
    }

    public java.util.Map<String, Long> getPublicStats() {
        java.util.Map<String, Long> stats = new java.util.HashMap<>();
        stats.put("servicesCount", serviceRepository.count());
        stats.put("estheticiansCount", estheticianRepository.count());
        stats.put("reviewsCount", reviewRepository.count());
        return stats;
    }
}
