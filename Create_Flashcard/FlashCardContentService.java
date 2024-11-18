package com.g3appdev.smartie.Service;

import com.g3appdev.smartie.Entity.FlashCardContent;
import com.g3appdev.smartie.Repository.FlashCardContentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FlashCardContentService {
    @Autowired
    private FlashCardContentRepo flashCardContentRepo;

    public FlashCardContent saveContent(FlashCardContent content) {
        return flashCardContentRepo.save(content);
    }

    public List<FlashCardContent> getAllContents() {
        return flashCardContentRepo.findAll();
    }

    public FlashCardContent updateContent(FlashCardContent content) {
        FlashCardContent existingContent = flashCardContentRepo.findById(content.getContentId()).orElse(null);
        if (existingContent != null) {
            existingContent.setFlashCard(content.getFlashCard());
            existingContent.setNumberOfQuestion(content.getNumberOfQuestion());
            existingContent.setQuestion(content.getQuestion());
            existingContent.setAnswer(content.getAnswer());
            return flashCardContentRepo.save(existingContent);
        }
        return null;
    }

    public String deleteContent(long contentId) {
        flashCardContentRepo.deleteById(contentId);
        return "deleted " + contentId;
    }
}
