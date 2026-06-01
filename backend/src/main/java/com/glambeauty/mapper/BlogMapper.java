package com.glambeauty.mapper;

import com.glambeauty.domain.BlogArticle;
import com.glambeauty.dto.BlogArticleResponse;

public class BlogMapper {
    private BlogMapper() {
    }

    public static BlogArticleResponse toResponse(BlogArticle article) {
        if (article == null) {
            return null;
        }
        return new BlogArticleResponse(
            article.getId(),
            article.getTitle(),
            article.getExcerpt(),
            article.getContent(),
            article.getCoverImageUrl(),
            article.getPublishedAt(),
            article.getCreatedAt()
        );
    }
}
