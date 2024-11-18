package com.g3appdev.smartie.Repository;

import com.g3appdev.smartie.Entity.TrackProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackProgressRepo extends JpaRepository<TrackProgress, Long> {
}