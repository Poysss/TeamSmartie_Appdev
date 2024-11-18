package com.g3appdev.smartie.Entity;

import jakarta.persistence.*;

@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    @ManyToOne
    @JoinColumn(name = "flashCardId")
    private FlashCard flashCard;

    @Column
    private String reviewIncorrectAnswer;

    @Column
    private String reviewCorrectAnswer;

    // Getters and Setters
    public long getReviewId() {
        return reviewId;
    }

    public FlashCard getFlashCard() {
        return flashCard;
    }

    public void setFlashCard(FlashCard flashCard) {
        this.flashCard = flashCard;
    }

    public String getReviewIncorrectAnswer() {
        return reviewIncorrectAnswer;
    }

    public void setReviewIncorrectAnswer(String reviewIncorrectAnswer) {
        this.reviewIncorrectAnswer = reviewIncorrectAnswer;
    }

    public String getReviewCorrectAnswer() {
        return reviewCorrectAnswer;
    }

    public void setReviewCorrectAnswer(String reviewCorrectAnswer) {
        this.reviewCorrectAnswer = reviewCorrectAnswer;
    }
}