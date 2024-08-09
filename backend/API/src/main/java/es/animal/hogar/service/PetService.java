package es.animal.hogar.service;

import org.springframework.stereotype.Service;

import es.animal.hogar.model.Pet;
import es.animal.hogar.repository.PetRepository;

import java.util.List;

@Service
public class PetService {

	private final PetRepository petRepository;

	public PetService(PetRepository petRepository) {
		this.petRepository = petRepository;
	}

	public List<Pet> getAllPets() {
		return petRepository.findAll();
	}

	public void addPet(Pet pet) {
		petRepository.save(pet);
	}
}