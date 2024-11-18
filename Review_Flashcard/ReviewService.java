package com.g3appdev.smartie.Service;

import com.g3appdev.smartie.Entity.Review;
import com.g3appdev.smartie.Repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;

    public Review saveReview(Review review) {
        return reviewRepo.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepo.findAll();
    }

    public Review updateReview(Review review) {
        Review existingReview = reviewRepo.findById(review.getReviewId()).orElse(null);
        if (existingReview != null) {
            existingReview.setFlashCard(review.getFlashCard());
            existingReview.setReviewIncorrectAnswer(review.getReviewIncorrectAnswer());
            existingReview.setReviewCorrectAnswer(review.getReviewCorrectAnswer());
            return reviewRepo.save(existingReview);
        }
        return null;
    }

    public String deleteReview(long reviewId) {
        reviewRepo.deleteById(reviewId);
        return "deleted " + reviewId;
    }
}