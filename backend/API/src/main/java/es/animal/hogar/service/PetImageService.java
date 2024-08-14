package es.animal.hogar.service;

import org.springframework.stereotype.Service;

import es.animal.hogar.model.PetImage;
import es.animal.hogar.repository.PetImageRepository;

import java.util.List;

@Service
public class PetImageService {

    private final PetImageRepository petImageRepository;

    public PetImageService(PetImageRepository petImageRepository) {
        this.petImageRepository = petImageRepository;
    }

    public List<PetImage> getImagesForPet(Long petId) {
        return petImageRepository.findAllByPetId(petId);
    }

    public void addPetImage(PetImage petImage) {
        petImageRepository.save(petImage);
    }

    public void updatePetImage(Long id, PetImage petImage) {
        PetImage existingImage = petImageRepository.findById(id);
        if (existingImage != null) {
            existingImage.setImage(petImage.getImage());
            petImageRepository.update(existingImage);
        }
    }

    public void deletePetImage(Long id) {
        petImageRepository.delete(id);
    }
}
