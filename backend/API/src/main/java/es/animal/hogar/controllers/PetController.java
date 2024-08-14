package es.animal.hogar.controllers;

import org.springframework.web.bind.annotation.*;

import es.animal.hogar.entities.Pet;
import es.animal.hogar.services.PetService;

import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping("all")
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    @PostMapping("add")
    public void addPet(@RequestBody Pet pet) {
        petService.addPet(pet);
    }

    @PutMapping("update/{id}")
    public void updatePet(@PathVariable Long id, @RequestBody Pet pet) {
        petService.updatePet(id, pet);
    }

    @DeleteMapping("delete/{id}")
    public void deletePet(@PathVariable Long id) {
        petService.deletePet(id);
    }
}
