package com.glambeauty.controller;

import com.glambeauty.domain.User;
import com.glambeauty.dto.ReviewRequest;
import com.glambeauty.dto.ReviewResponse;
import com.glambeauty.service.ReviewService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    @PreAuthorize("hasRole('CLIENT')")
    public ReviewResponse create(@Valid @RequestBody ReviewRequest request, Authentication authentication) {
        return reviewService.createReview(request, getUserId(authentication));
    }

    @GetMapping("/service/{serviceId}")
    public List<ReviewResponse> getByService(@PathVariable Long serviceId) {
        return reviewService.getReviewsByService(serviceId);
    }

    @GetMapping("/esthetician/{estheticianId}")
    public List<ReviewResponse> getByEsthetician(@PathVariable Long estheticianId) {
        return reviewService.getReviewsByEsthetician(estheticianId);
    }

    private Long getUserId(Authentication authentication) {
        return ((User) authentication.getPrincipal()).getId();
    }
}
