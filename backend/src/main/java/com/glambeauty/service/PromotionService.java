package com.glambeauty.service;

import com.glambeauty.domain.Promotion;
import com.glambeauty.dto.PromotionRequest;
import com.glambeauty.dto.PromotionResponse;
import com.glambeauty.exception.NotFoundException;
import com.glambeauty.mapper.PromotionMapper;
import com.glambeauty.repository.PromotionRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PromotionService {
    private final PromotionRepository promotionRepository;

    public PromotionService(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    public List<PromotionResponse> getAll() {
        return promotionRepository.findAll().stream()
            .map(PromotionMapper::toResponse)
            .collect(Collectors.toList());
    }

    public PromotionResponse getById(Long id) {
        Promotion promotion = promotionRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Promotion not found"));
        return PromotionMapper.toResponse(promotion);
    }

    public PromotionResponse create(PromotionRequest request) {
        Promotion promotion = new Promotion();
        promotion.setTitle(request.title());
        promotion.setDescription(request.description());
        promotion.setDiscountPercent(request.discountPercent());
        promotion.setStartDate(request.startDate());
        promotion.setEndDate(request.endDate());
        promotion.setImageUrls(request.imageUrls());
        return PromotionMapper.toResponse(promotionRepository.save(promotion));
    }

    public PromotionResponse update(Long id, PromotionRequest request) {
        Promotion promotion = promotionRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Promotion not found"));
        promotion.setTitle(request.title());
        promotion.setDescription(request.description());
        promotion.setDiscountPercent(request.discountPercent());
        promotion.setStartDate(request.startDate());
        promotion.setEndDate(request.endDate());
        if (request.imageUrls() != null) {
            promotion.setImageUrls(request.imageUrls());
        }
        return PromotionMapper.toResponse(promotionRepository.save(promotion));
    }

    public void delete(Long id) {
        if (!promotionRepository.existsById(id)) {
            throw new NotFoundException("Promotion not found");
        }
        promotionRepository.deleteById(id);
    }
}
