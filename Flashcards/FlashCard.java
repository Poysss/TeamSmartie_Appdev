package com.g3appdev.smartie.Entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class FlashCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long flashCardId;

    @ManyToOne
    @JoinColumn(name = "studentId")
    private Student student;

    @Column
    private String subject;

    @Column
    private String category;

    @OneToMany(mappedBy = "flashCard", cascade = CascadeType.ALL)
    private List<FlashCardContent> contents;  // renamed from creates

    @OneToMany(mappedBy = "flashCard", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "flashCard", cascade = CascadeType.ALL)
    private List<TrackProgress> trackProgresses;

    // Getters and Setters
    public long getFlashCardId() {
        return flashCardId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}