package com.g3appdev.smartie.Entity;

import jakarta.persistence.*;

@Entity
public class TrackProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long progressId;

    @ManyToOne
    @JoinColumn(name = "flashCardId")
    private FlashCard flashCard;

    @Column
    private int score;

    @Column
    private String scoreComparison;

    @Column
    private int timeSpent;

    // Getters and Setters
    public long getProgressId() {
        return progressId;
    }

    public FlashCard getFlashCard() {
        return flashCard;
    }

    public void setFlashCard(FlashCard flashCard) {
        this.flashCard = flashCard;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getScoreComparison() {
        return scoreComparison;
    }

    public void setScoreComparison(String scoreComparison) {
        this.scoreComparison = scoreComparison;
    }

    public int getTimeSpent() {
        return timeSpent;
    }

    public void setTimeSpent(int timeSpent) {
        this.timeSpent = timeSpent;
    }
}