package com.g3appdev.smartie.Controller;

import com.g3appdev.smartie.Entity.FlashCardContent;
import com.g3appdev.smartie.Service.FlashCardContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FlashCardContentController {
    @Autowired
    private FlashCardContentService flashCardContentService;

    @PostMapping("/content/add")
    public FlashCardContent postContent(@RequestBody FlashCardContent content) {
        return flashCardContentService.saveContent(content);
    }

    @GetMapping("/content/get")
    public List<FlashCardContent> getContents() {
        return flashCardContentService.getAllContents();
    }

    @PutMapping("/content/update")
    public FlashCardContent updateContent(@RequestBody FlashCardContent content) {
        return flashCardContentService.updateContent(content);
    }

    @DeleteMapping("/content/delete/{contentId}")
    public String deleteContent(@PathVariable long contentId) {
        return flashCardContentService.deleteContent(contentId);
    }
}