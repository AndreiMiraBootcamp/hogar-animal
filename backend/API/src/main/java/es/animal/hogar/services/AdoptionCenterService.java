package es.animal.hogar.services;

import es.animal.hogar.entities.AdoptionCenter;
import es.animal.hogar.repository.AdoptionCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdoptionCenterService {

    @Autowired
    private AdoptionCenterRepository adoptionCenterRepository;

    public List<AdoptionCenter> getAllAdoptionCenters() {
        return adoptionCenterRepository.findAll();
    }

    public AdoptionCenter getAdoptionCenterById(Integer id) {
        Optional<AdoptionCenter> optionalAdoptionCenter = adoptionCenterRepository.findById(id);
        return optionalAdoptionCenter.orElse(null); // Devuelve null si no se encuentra
    }

    public AdoptionCenter createAdoptionCenter(AdoptionCenter adoptionCenter) {
        return adoptionCenterRepository.save(adoptionCenter);
    }

    public AdoptionCenter updateAdoptionCenter(Integer id, AdoptionCenter adoptionCenterDetails) {
        return adoptionCenterRepository.findById(id).map(adoptionCenter -> {
            adoptionCenter.setName(adoptionCenterDetails.getName());
            adoptionCenter.setCity(adoptionCenterDetails.getCity());
            adoptionCenter.setUser(adoptionCenterDetails.getUser());
            adoptionCenter.setAddress(adoptionCenterDetails.getAddress());
            adoptionCenter.setPostalCode(adoptionCenterDetails.getPostalCode());
            adoptionCenter.setPhone(adoptionCenterDetails.getPhone());
            adoptionCenter.setWebsite(adoptionCenterDetails.getWebsite());
            adoptionCenter.setFoundationYear(adoptionCenterDetails.getFoundationYear());
            adoptionCenter.setPhotoUrl(adoptionCenterDetails.getPhotoUrl());
            return adoptionCenterRepository.save(adoptionCenter);
        }).orElse(null); // Devuelve null si no se encuentra
    }

    public boolean deleteAdoptionCenter(Integer id) {
        if (adoptionCenterRepository.existsById(id)) {
            adoptionCenterRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
