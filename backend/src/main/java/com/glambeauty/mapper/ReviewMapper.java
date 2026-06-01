package com.glambeauty.mapper;

import com.glambeauty.domain.Review;
import com.glambeauty.dto.ReviewResponse;

public class ReviewMapper {
    private ReviewMapper() {
    }

    public static ReviewResponse toResponse(Review review) {
        if (review == null) {
            return null;
        }
        String clientName = review.getClient() != null && review.getClient().getUser() != null
            ? review.getClient().getUser().getEmail()
            : null;
        return new ReviewResponse(
            review.getId(),
            review.getRating(),
            review.getComment(),
            review.getCreatedAt(),
            clientName
        );
    }
}
