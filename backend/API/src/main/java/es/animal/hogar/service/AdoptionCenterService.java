package es.animal.hogar.service;

import org.springframework.stereotype.Service;

import es.animal.hogar.model.AdoptionCenter;
import es.animal.hogar.repository.AdoptionCenterRepository;

import java.util.List;

@Service
public class AdoptionCenterService {

    private final AdoptionCenterRepository adoptionCenterRepository;

    public AdoptionCenterService(AdoptionCenterRepository adoptionCenterRepository) {
        this.adoptionCenterRepository = adoptionCenterRepository;
    }

    public List<AdoptionCenter> getAllCenters() {
        return adoptionCenterRepository.findAll();
    }

    public void addCenter(AdoptionCenter center) {
        adoptionCenterRepository.save(center);
    }

    public void updateCenter(Long id, AdoptionCenter center) {
        AdoptionCenter existingCenter = adoptionCenterRepository.findById(id);
        if (existingCenter != null) {
            existingCenter.setUserId(center.getUserId());
            existingCenter.setName(center.getName());
            existingCenter.setAddress(center.getAddress());
            existingCenter.setCity(center.getCity());
            existingCenter.setState(center.getState());
            existingCenter.setPostalCode(center.getPostalCode());
            existingCenter.setPhone(center.getPhone());
            existingCenter.setWebsite(center.getWebsite());
            existingCenter.setFoundationYear(center.getFoundationYear());
            adoptionCenterRepository.update(existingCenter);
        }
    }

    public void deleteCenter(Long id) {
        adoptionCenterRepository.delete(id);
    }
}
