package com.g3appdev.smartie.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class FlashCardContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long contentId;  // renamed from createId

    @ManyToOne
    @JoinColumn(name = "flashCardId")
    private FlashCard flashCard;

    @Column
    private int numberOfQuestion;

    @Column
    private String question;

    @Column
    private String answer;

    @OneToMany(mappedBy = "flashCardContent", cascade = CascadeType.ALL)  // renamed from create
    private List<QuizMode> quizModes;

    // Updated Getters and Setters
    public long getContentId() {
        return contentId;
    }

    public FlashCard getFlashCard() {
        return flashCard;
    }

    public void setFlashCard(FlashCard flashCard) {
        this.flashCard = flashCard;
    }

    public int getNumberOfQuestion() {
        return numberOfQuestion;
    }

    public void setNumberOfQuestion(int numberOfQuestion) {
        this.numberOfQuestion = numberOfQuestion;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}