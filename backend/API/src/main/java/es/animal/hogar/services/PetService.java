package es.animal.hogar.services;

import es.animal.hogar.dtos.PetDTO;
import es.animal.hogar.entities.Pet;
import es.animal.hogar.entities.AdoptionCenter;
import es.animal.hogar.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    public List<PetDTO> getAllPets() {
        return petRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public PetDTO getPetById(Integer id) {
        Optional<Pet> optionalPet = petRepository.findById(id);
        return optionalPet.map(this::convertToDTO).orElse(null);
    }

    public PetDTO createPet(PetDTO petDTO) {
        Pet pet = convertToEntity(petDTO);
        Pet savedPet = petRepository.save(pet);
        return convertToDTO(savedPet);
    }

    public PetDTO updatePet(Integer id, PetDTO petDTO) {
        return petRepository.findById(id).map(pet -> {
            pet.setName(petDTO.getName());
            pet.setSpecies(petDTO.getSpecies());
            pet.setBreed(petDTO.getBreed());
            pet.setAge(petDTO.getAge());
            pet.setGender(petDTO.getGender());
            pet.setDescription(petDTO.getDescription());
            pet.setPhotoUrl(petDTO.getPhotoUrl());
            pet.setAvailable(petDTO.getAvailable());
            // Aquí asumimos que el `AdoptionCenter` solo necesita el ID
            AdoptionCenter adoptionCenter = new AdoptionCenter();
            adoptionCenter.setCenterId(petDTO.getCenterId());
            pet.setAdoptionCenter(adoptionCenter);
            return convertToDTO(petRepository.save(pet));
        }).orElse(null);
    }

    public boolean deletePet(Integer id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private PetDTO convertToDTO(Pet pet) {
        return new PetDTO(
            pet.getPetId(),
            pet.getName(),
            pet.getSpecies(),
            pet.getBreed(),
            pet.getAge(),
            pet.getGender(),
            pet.getDescription(),
            pet.getPhotoUrl(),
            pet.getAvailable(),
            pet.getAdoptionCenter() != null ? pet.getAdoptionCenter().getCenterId() : null
        );
    }

    private Pet convertToEntity(PetDTO petDTO) {
        AdoptionCenter adoptionCenter = new AdoptionCenter();
        adoptionCenter.setCenterId(petDTO.getCenterId());

        Pet pet = new Pet();
        pet.setName(petDTO.getName());
        pet.setSpecies(petDTO.getSpecies());
        pet.setBreed(petDTO.getBreed());
        pet.setAge(petDTO.getAge());
        pet.setGender(petDTO.getGender());
        pet.setDescription(petDTO.getDescription());
        pet.setPhotoUrl(petDTO.getPhotoUrl());
        pet.setAvailable(petDTO.getAvailable());
        pet.setAdoptionCenter(adoptionCenter);

        return pet;
    }
}
