package com.g3appdev.smartie.Repository;

import com.g3appdev.smartie.Entity.FlashCardContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashCardContentRepo extends JpaRepository<FlashCardContent, Long> {
}