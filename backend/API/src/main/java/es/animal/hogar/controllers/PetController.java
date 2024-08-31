package es.animal.hogar.controllers;

import es.animal.hogar.dtos.PetDTO;
import es.animal.hogar.entities.Pet;
import es.animal.hogar.services.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping
    public List<PetDTO> getAllPets() {
        return petService.getAllPets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Integer id) {
        PetDTO pet = petService.getPetById(id);
        return pet != null ? ResponseEntity.ok(pet) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public PetDTO createPet(@RequestBody PetDTO pet) {
        return petService.createPet(pet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(
            @PathVariable Integer id, @RequestBody PetDTO petDetails) {
        PetDTO updatedPet = petService.updatePet(id, petDetails);
        return updatedPet != null ? ResponseEntity.ok(updatedPet) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Integer id) {
        return petService.deletePet(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    @GetMapping("/center/{centerId}")
    public ResponseEntity<List<Pet>> getPetsByAdoptionCenterId(@PathVariable Integer centerId) {
        List<Pet> pets = petService.getPetsByAdoptionCenterId(centerId);
        if (pets.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(pets);
    }
    
    @GetMapping("/center/{centerId}/species-count")
    public ResponseEntity<Map<String, Long>> getPetCountsBySpeciesInCenter(@PathVariable Integer centerId) {
        Map<String, Long> speciesCounts = petService.getPetCountsBySpeciesInCenter(centerId);
        if (speciesCounts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(speciesCounts);
    }
}
