package es.animal.hogar.services;

import es.animal.hogar.entities.Pet;
import es.animal.hogar.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public Pet getPetById(Integer id) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        return optionalPet.orElse(null); // Devuelve null si no se encuentra
    }

    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }

    public Pet updatePet(Integer id, Pet petDetails) {
        return petRepository.findById(id).map(pet -> {
            pet.setName(petDetails.getName());
            pet.setSpecies(petDetails.getSpecies());
            pet.setBreed(petDetails.getBreed());
            pet.setAge(petDetails.getAge());
            pet.setGender(petDetails.getGender());
            pet.setDescription(petDetails.getDescription());
            pet.setPhotoUrl(petDetails.getPhotoUrl());
            pet.setAvailable(petDetails.getAvailable());
            pet.setCreatedAt(petDetails.getCreatedAt());
            return petRepository.save(pet);
        }).orElse(null); // Devuelve null si no se encuentra
    }

    public boolean deletePet(Integer id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
