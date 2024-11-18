package com.g3appdev.smartie.Repository;

import com.g3appdev.smartie.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepo extends JpaRepository<Review, Long> {
}