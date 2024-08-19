package es.animal.hogar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import es.animal.hogar.entities.AdoptionCenter;
import es.animal.hogar.entities.City;
import es.animal.hogar.entities.State;
import es.animal.hogar.repository.AdoptionCenterRepository;
import es.animal.hogar.repository.CityRepository;
import es.animal.hogar.repository.StateRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AdoptionCenterService {

    private final AdoptionCenterRepository adoptionCenterRepository;
    private final CityRepository cityRepository;
    private final StateRepository stateRepository;

    @Autowired
    public AdoptionCenterService(AdoptionCenterRepository adoptionCenterRepository, CityRepository cityRepository, StateRepository stateRepository) {
        this.adoptionCenterRepository = adoptionCenterRepository;
        this.cityRepository = cityRepository;
        this.stateRepository = stateRepository;
    }

    public List<AdoptionCenter> getAllCenters() {
        return adoptionCenterRepository.findAll();
    }

    public void addCenter(AdoptionCenter center) {
        validateCityAndState(center);
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

            validateCityAndState(existingCenter);
            adoptionCenterRepository.update(existingCenter);
        }
    }

    public void deleteCenter(Long id) {
        adoptionCenterRepository.delete(id);
    }

    private void validateCityAndState(AdoptionCenter center) {
        if (center.getCity() != null) {
            Optional<City> city = cityRepository.findById(center.getCity().getCityId());
            if (city.isEmpty()) {
                throw new RuntimeException("City with ID " + center.getCity().getCityId() + " not found");
            }
        }

        if (center.getState() != null) {
            Optional<State> state = stateRepository.findById(center.getState().getStateId());
            if (state.isEmpty()) {
                throw new RuntimeException("State with ID " + center.getState().getStateId() + " not found");
            }
        }
    }
}
