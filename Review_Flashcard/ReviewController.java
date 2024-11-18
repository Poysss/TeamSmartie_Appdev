package com.g3appdev.smartie.Controller;

import com.g3appdev.smartie.Entity.Review;
import com.g3appdev.smartie.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/review/add")
    public Review postReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    @GetMapping("/review/get")
    public List<Review> getReviews() {
        return reviewService.getAllReviews();
    }

    @PutMapping("/review/update")
    public Review updateReview(@RequestBody Review review) {
        return reviewService.updateReview(review);
    }

    @DeleteMapping("/review/delete/{reviewId}")
    public String deleteReview(@PathVariable long reviewId) {
        return reviewService.deleteReview(reviewId);
    }
}