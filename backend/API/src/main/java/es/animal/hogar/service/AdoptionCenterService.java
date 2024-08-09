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
}