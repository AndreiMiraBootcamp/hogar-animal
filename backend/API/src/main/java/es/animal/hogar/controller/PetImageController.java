package es.animal.hogar.controller;


import org.springframework.web.bind.annotation.*;

import es.animal.hogar.model.PetImage;
import es.animal.hogar.service.PetImageService;

import java.util.List;

@RestController
@RequestMapping("/api/pet-images")
public class PetImageController {

    private final PetImageService petImageService;

    public PetImageController(PetImageService petImageService) {
        this.petImageService = petImageService;
    }

    @GetMapping("/{petId}")
    public List<PetImage> getImagesForPet(@PathVariable Long petId) {
        return petImageService.getImagesForPet(petId);
    }

    @PostMapping
    public void addPetImage(@RequestBody PetImage petImage) {
        petImageService.addPetImage(petImage);
    }
}