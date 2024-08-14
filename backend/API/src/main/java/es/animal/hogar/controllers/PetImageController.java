package es.animal.hogar.controllers;

import org.springframework.web.bind.annotation.*;

import es.animal.hogar.entities.PetImage;
import es.animal.hogar.services.PetImageService;

import java.util.List;

@RestController
@RequestMapping("/pet-images")
public class PetImageController {

    private final PetImageService petImageService;

    public PetImageController(PetImageService petImageService) {
        this.petImageService = petImageService;
    }

    @PostMapping("get/{petId}")
    public List<PetImage> getImagesForPet(@PathVariable Long petId) {
        return petImageService.getImagesForPet(petId);
    }

    @PostMapping("add")
    public void addPetImage(@RequestBody PetImage petImage) {
        petImageService.addPetImage(petImage);
    }

    @PutMapping("update/{id}")
    public void updatePetImage(@PathVariable Long id, @RequestBody PetImage petImage) {
        petImageService.updatePetImage(id, petImage);
    }

    @DeleteMapping("delete/{id}")
    public void deletePetImage(@PathVariable Long id) {
        petImageService.deletePetImage(id);
    }
}
