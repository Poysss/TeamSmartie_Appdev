package com.g3appdev.smartie.Controller;

import com.g3appdev.smartie.Entity.TrackProgress;
import com.g3appdev.smartie.Service.TrackProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class TrackProgressController {
    @Autowired
    private TrackProgressService trackProgressService;

    @PostMapping("/progress/add")
    public TrackProgress postTrackProgress(@RequestBody TrackProgress trackProgress) {
        return trackProgressService.saveTrackProgress(trackProgress);
    }

    @GetMapping("/progress/get")
    public List<TrackProgress> getTrackProgress() {
        return trackProgressService.getAllTrackProgress();
    }

    @PutMapping("/progress/update")
    public TrackProgress updateTrackProgress(@RequestBody TrackProgress trackProgress) {
        return trackProgressService.updateTrackProgress(trackProgress);
    }

    @DeleteMapping("/progress/delete/{progressId}")
    public String deleteTrackProgress(@PathVariable long progressId) {
        return trackProgressService.deleteTrackProgress(progressId);
    }
}