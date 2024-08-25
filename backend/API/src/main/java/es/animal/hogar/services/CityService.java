package es.animal.hogar.services;

import es.animal.hogar.dtos.CityDTO;
import es.animal.hogar.entities.City;
import es.animal.hogar.entities.State;
import es.animal.hogar.repository.CityRepository;
import es.animal.hogar.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CityService {

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private StateRepository stateRepository;

    public List<CityDTO> getAllCities() {
        return cityRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public CityDTO getCityById(Integer id) {
        Optional<City> optionalCity = cityRepository.findById(id);
        return optionalCity.map(this::convertToDTO).orElse(null);
    }

    public CityDTO createCity(CityDTO cityDTO) {
        City city = convertToEntity(cityDTO);
        City savedCity = cityRepository.save(city);
        return convertToDTO(savedCity);
    }

    public CityDTO updateCity(Integer id, CityDTO cityDTO) {
        return cityRepository.findById(id).map(city -> {
            city.setName(cityDTO.getName());
            city.setState(stateRepository.findById(cityDTO.getStateId()).orElse(null)); // Actualiza la relación con State
            City updatedCity = cityRepository.save(city);
            return convertToDTO(updatedCity);
        }).orElse(null);
    }

    public boolean deleteCity(Integer id) {
        if (cityRepository.existsById(id)) {
            cityRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private CityDTO convertToDTO(City city) {
        return new CityDTO(city.getCityId(), city.getName(), city.getState().getStateId());
    }

    private City convertToEntity(CityDTO cityDTO) {
        State state = stateRepository.findById(cityDTO.getStateId()).orElse(null);
        return new City(cityDTO.getCityId(), cityDTO.getName(), state, null, null);
    }
}
