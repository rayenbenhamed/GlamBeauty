package com.glambeauty.service;

import com.glambeauty.domain.BeautyService;
import com.glambeauty.domain.ClientProfile;
import com.glambeauty.domain.EstheticianProfile;
import com.glambeauty.domain.Review;
import com.glambeauty.dto.ReviewRequest;
import com.glambeauty.dto.ReviewResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.ReviewMapper;
import com.glambeauty.repository.BeautyServiceRepository;
import com.glambeauty.repository.ClientProfileRepository;
import com.glambeauty.repository.EstheticianProfileRepository;
import com.glambeauty.repository.ReviewRepository;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ClientProfileRepository clientRepository;
    private final BeautyServiceRepository serviceRepository;
    private final EstheticianProfileRepository estheticianRepository;

    public ReviewService(
        ReviewRepository reviewRepository,
        ClientProfileRepository clientRepository,
        BeautyServiceRepository serviceRepository,
        EstheticianProfileRepository estheticianRepository
    ) {
        this.reviewRepository = reviewRepository;
        this.clientRepository = clientRepository;
        this.serviceRepository = serviceRepository;
        this.estheticianRepository = estheticianRepository;
    }

    public ReviewResponse createReview(ReviewRequest request, Long userId) {
        ClientProfile client = clientRepository.findByUserId(userId)
            .orElseThrow(() -> new NotFoundException("Client profile not found"));

        BeautyService service = null;
        EstheticianProfile esthetician = null;
        if (request.serviceId() != null) {
            service = serviceRepository.findById(request.serviceId())
                .orElseThrow(() -> new NotFoundException("Service not found"));
        }
        if (request.estheticianId() != null) {
            esthetician = estheticianRepository.findById(request.estheticianId())
                .orElseThrow(() -> new NotFoundException("Esthetician not found"));
        }

        Review review = new Review();
        review.setClient(client);
        review.setService(service);
        review.setEsthetician(esthetician);
        review.setRating(request.rating());
        review.setComment(request.comment());
        review.setCreatedAt(Instant.now());
        return ReviewMapper.toResponse(reviewRepository.save(review));
    }

    public List<ReviewResponse> getReviewsByService(Long serviceId) {
        return reviewRepository.findByServiceId(serviceId).stream()
            .map(ReviewMapper::toResponse)
            .collect(Collectors.toList());
    }

    public List<ReviewResponse> getReviewsByEsthetician(Long estheticianId) {
        return reviewRepository.findByEstheticianId(estheticianId).stream()
            .map(ReviewMapper::toResponse)
            .collect(Collectors.toList());
    }
}
