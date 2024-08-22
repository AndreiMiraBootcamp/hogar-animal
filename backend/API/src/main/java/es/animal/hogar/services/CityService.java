package es.animal.hogar.services;

import es.animal.hogar.entities.City;
import es.animal.hogar.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    public City getCityById(Integer id) {
        Optional<City> optionalCity = cityRepository.findById(id);
        return optionalCity.orElse(null); // Devuelve null si no se encuentra
    }

    public City createCity(City city) {
        return cityRepository.save(city);
    }

    public City updateCity(Integer id, City cityDetails) {
        return cityRepository.findById(id).map(city -> {
            city.setName(cityDetails.getName());
            city.setState(cityDetails.getState());
            return cityRepository.save(city);
        }).orElse(null); // Devuelve null si no se encuentra
    }

    public boolean deleteCity(Integer id) {
        if (cityRepository.existsById(id)) {
            cityRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
