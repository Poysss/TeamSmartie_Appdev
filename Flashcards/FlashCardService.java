package com.g3appdev.smartie.Service;

import com.g3appdev.smartie.Entity.FlashCard;
import com.g3appdev.smartie.Repository.FlashCardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FlashCardService {
    @Autowired
    private FlashCardRepo flashCardRepo;

    public FlashCard saveFlashCard(FlashCard flashCard) {
        return flashCardRepo.save(flashCard);
    }

    public List<FlashCard> getAllFlashCards() {
        return flashCardRepo.findAll();
    }

    public FlashCard updateFlashCard(FlashCard flashCard) {
        FlashCard existingFlashCard = flashCardRepo.findById(flashCard.getFlashCardId()).orElse(null);
        if (existingFlashCard != null) {
            existingFlashCard.setSubject(flashCard.getSubject());
            existingFlashCard.setCategory(flashCard.getCategory());
            existingFlashCard.setStudent(flashCard.getStudent());
            return flashCardRepo.save(existingFlashCard);
        }
        return null;
    }

    public String deleteFlashCard(long flashCardId) {
        flashCardRepo.deleteById(flashCardId);
        return "deleted " + flashCardId;
    }
}