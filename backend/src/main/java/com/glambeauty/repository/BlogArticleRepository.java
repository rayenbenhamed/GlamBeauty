package com.glambeauty.repository;

import com.glambeauty.domain.BlogArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogArticleRepository extends JpaRepository<BlogArticle, Long> {
}
