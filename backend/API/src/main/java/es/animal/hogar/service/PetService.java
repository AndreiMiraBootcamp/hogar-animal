package es.animal.hogar.service;

import es.animal.hogar.model.Pet;
import es.animal.hogar.repository.PetRepository;

import org.springframework.stereotype.Service;

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

    public void updatePet(Long id, Pet pet) {
        Pet existingPet = petRepository.findById(id);
        if (existingPet != null) {
            existingPet.setCenterId(pet.getCenterId());
            existingPet.setName(pet.getName());
            existingPet.setSpecies(pet.getSpecies());
            existingPet.setBreed(pet.getBreed());
            existingPet.setAge(pet.getAge());
            existingPet.setGender(pet.getGender());
            existingPet.setDescription(pet.getDescription());
            existingPet.setPhotoUrl(pet.getPhotoUrl());
            existingPet.setAvailable(pet.getAvailable());
            petRepository.update(existingPet);
        }
    }

    public void deletePet(Long id) {
        petRepository.delete(id);
    }
}
