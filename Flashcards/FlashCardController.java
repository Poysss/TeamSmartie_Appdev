package com.g3appdev.smartie.Controller;

import com.g3appdev.smartie.Entity.FlashCard;
import com.g3appdev.smartie.Service.FlashCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FlashCardController {
    @Autowired
    private FlashCardService flashCardService;

    @PostMapping("/flashcard/add")
    public FlashCard postFlashCard(@RequestBody FlashCard flashCard) {
        return flashCardService.saveFlashCard(flashCard);
    }

    @GetMapping("/flashcard/get")
    public List<FlashCard> getFlashCards() {
        return flashCardService.getAllFlashCards();
    }

    @PutMapping("/flashcard/update")
    public FlashCard updateFlashCard(@RequestBody FlashCard flashCard) {
        return flashCardService.updateFlashCard(flashCard);
    }

    @DeleteMapping("/flashcard/delete/{flashCardId}")
    public String deleteFlashCard(@PathVariable long flashCardId) {
        return flashCardService.deleteFlashCard(flashCardId);
    }
}