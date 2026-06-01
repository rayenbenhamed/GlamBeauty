package com.glambeauty.mapper;

import com.glambeauty.domain.Promotion;
import com.glambeauty.dto.PromotionResponse;

public class PromotionMapper {
    private PromotionMapper() {
    }

    public static PromotionResponse toResponse(Promotion promotion) {
        if (promotion == null) {
            return null;
        }
        return new PromotionResponse(
            promotion.getId(),
            promotion.getTitle(),
            promotion.getDescription(),
            promotion.getDiscountPercent(),
            promotion.getStartDate(),
            promotion.getEndDate(),
            promotion.getImageUrls()
        );
    }
}
