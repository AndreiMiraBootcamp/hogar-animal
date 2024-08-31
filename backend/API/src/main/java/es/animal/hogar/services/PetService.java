package es.animal.hogar.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.animal.hogar.dtos.PetDTO;
import es.animal.hogar.entities.AdoptionCenter;
import es.animal.hogar.entities.Pet;
import es.animal.hogar.repository.PetRepository;

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
        // 1. Convertir el DTO en una entidad
        Pet pet = convertToEntity(petDTO);

        Pet savedPet = petRepository.save(pet);

        String photoUrl = "images/pets/" + savedPet.getPetId();

        savedPet.setPhotoUrl(photoUrl);

        Pet updatedPet = petRepository.save(savedPet);

        return convertToDTO(updatedPet);
    }
    
    public List<Pet> getPetsByAdoptionCenterId(Integer centerId) {
        return petRepository.findByAdoptionCenterCenterId(centerId);
    }
    
    public Map<String, Long> getPetCountsBySpeciesInCenter(Integer centerId) {
        List<Object[]> results = petRepository.countPetsBySpeciesInCenter(centerId);
        return results.stream().collect(Collectors.toMap(
            result -> ((Pet.Species) result[0]).name().toLowerCase(), // Convierte la especie a string en minúsculas
            result -> (Long) result[1] // El conteo
        ));
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
            pet.getAdoptionCenter() != null ? pet.getAdoptionCenter().getCenterId() : null,
            pet.getCreatedAt() // Incluir el campo createdAt
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
        pet.setCreatedAt(petDTO.getCreatedAt());

        return pet;
    }

}
