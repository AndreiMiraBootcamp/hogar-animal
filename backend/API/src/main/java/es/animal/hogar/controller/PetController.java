package es.animal.hogar.controller;


import org.springframework.web.bind.annotation.*;

import es.animal.hogar.model.Pet;
import es.animal.hogar.service.PetService;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {

	private final PetService petService;

	public PetController(PetService petService) {
		this.petService = petService;
	}

	@GetMapping
	public List<Pet> getAllPets() {
		return petService.getAllPets();
	}

	@PostMapping
	public void addPet(@RequestBody Pet pet) {
		petService.addPet(pet);
	}
}