package com.g3appdev.smartie.Service;

import com.g3appdev.smartie.Entity.TrackProgress;
import com.g3appdev.smartie.Repository.TrackProgressRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TrackProgressService {
    @Autowired
    private TrackProgressRepo trackProgressRepo;

    public TrackProgress saveTrackProgress(TrackProgress trackProgress) {
        return trackProgressRepo.save(trackProgress);
    }

    public List<TrackProgress> getAllTrackProgress() {
        return trackProgressRepo.findAll();
    }

    public TrackProgress updateTrackProgress(TrackProgress trackProgress) {
        TrackProgress existingTrackProgress = trackProgressRepo.findById(trackProgress.getProgressId()).orElse(null);
        if (existingTrackProgress != null) {
            existingTrackProgress.setFlashCard(trackProgress.getFlashCard());
            existingTrackProgress.setScore(trackProgress.getScore());
            existingTrackProgress.setScoreComparison(trackProgress.getScoreComparison());
            existingTrackProgress.setTimeSpent(trackProgress.getTimeSpent());
            return trackProgressRepo.save(existingTrackProgress);
        }
        return null;
    }

    public String deleteTrackProgress(long progressId) {
        trackProgressRepo.deleteById(progressId);
        return "deleted " + progressId;
    }
}