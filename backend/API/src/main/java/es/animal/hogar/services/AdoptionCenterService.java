package es.animal.hogar.services;

import es.animal.hogar.dtos.AdoptionCenterDTO;
import es.animal.hogar.entities.AdoptionCenter;
import es.animal.hogar.entities.City;
import es.animal.hogar.entities.User;
import es.animal.hogar.repository.AdoptionCenterRepository;
import es.animal.hogar.repository.CityRepository;
import es.animal.hogar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdoptionCenterService {

    @Autowired
    private AdoptionCenterRepository adoptionCenterRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private UserRepository userRepository;

    // Obtener todos los centros de adopción
    public List<AdoptionCenterDTO> getAllAdoptionCenters() {
        return adoptionCenterRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public AdoptionCenterDTO getAdoptionCenterById(Integer id) {
        Optional<AdoptionCenter> optionalAdoptionCenter = adoptionCenterRepository.findById(id);
        return optionalAdoptionCenter.map(this::convertToDTO).orElse(null);
    }

    public AdoptionCenterDTO createAdoptionCenter(AdoptionCenterDTO adoptionCenterDTO) {
        AdoptionCenter adoptionCenter = convertToEntity(adoptionCenterDTO);
        AdoptionCenter savedAdoptionCenter = adoptionCenterRepository.save(adoptionCenter);
        return convertToDTO(savedAdoptionCenter);
    }

    public AdoptionCenterDTO updateAdoptionCenter(Integer id, AdoptionCenterDTO adoptionCenterDTO) {
        return adoptionCenterRepository.findById(id).map(adoptionCenter -> {
            adoptionCenter.setName(adoptionCenterDTO.getName());
            adoptionCenter.setCity(adoptionCenterDTO.getCity());
            adoptionCenter.setUser(userRepository.findById(adoptionCenterDTO.getUserId()).orElse(null));
            adoptionCenter.setAddress(adoptionCenterDTO.getAddress());
            adoptionCenter.setPostalCode(adoptionCenterDTO.getPostalCode());
            adoptionCenter.setPhone(adoptionCenterDTO.getPhone());
            adoptionCenter.setWebsite(adoptionCenterDTO.getWebsite());
            adoptionCenter.setFoundationYear(adoptionCenterDTO.getFoundationYear());
            adoptionCenter.setPhotoUrl(adoptionCenterDTO.getPhotoUrl());
            adoptionCenter.setLatitude(adoptionCenterDTO.getLatitude()); // Actualiza la latitud
            adoptionCenter.setLongitude(adoptionCenterDTO.getLongitude()); // Actualiza la longitud
            AdoptionCenter updatedAdoptionCenter = adoptionCenterRepository.save(adoptionCenter);
            return convertToDTO(updatedAdoptionCenter);
        }).orElse(null);
    }

    public boolean deleteAdoptionCenter(Integer id) {
        if (adoptionCenterRepository.existsById(id)) {
            adoptionCenterRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private AdoptionCenterDTO convertToDTO(AdoptionCenter adoptionCenter) {
        return new AdoptionCenterDTO(
            adoptionCenter.getCenterId(),
            adoptionCenter.getName(),
            adoptionCenter.getCity(),
            adoptionCenter.getUser().getUserId(),
            adoptionCenter.getAddress(),
            adoptionCenter.getPostalCode(),
            adoptionCenter.getPhone(),
            adoptionCenter.getWebsite(),
            adoptionCenter.getFoundationYear(),
            adoptionCenter.getPhotoUrl(),
            adoptionCenter.getLatitude(), // Incluye la latitud en el DTO
            adoptionCenter.getLongitude() // Incluye la longitud en el DTO
        );
    }

    // Convertir DTO a entidad
    private AdoptionCenter convertToEntity(AdoptionCenterDTO adoptionCenterDTO) {
        City city = adoptionCenterDTO.getCity(); // Se obtiene el objeto City directamente del DTO
        User user = userRepository.findById(adoptionCenterDTO.getUserId()).orElse(null); // Se busca el User usando el userId
        return new AdoptionCenter(
            adoptionCenterDTO.getCenterId(),
            adoptionCenterDTO.getName(),
            city,
            user,
            adoptionCenterDTO.getAddress(),
            adoptionCenterDTO.getPostalCode(),
            adoptionCenterDTO.getPhone(),
            adoptionCenterDTO.getWebsite(),
            adoptionCenterDTO.getFoundationYear(),
            adoptionCenterDTO.getPhotoUrl(),
            adoptionCenterDTO.getLatitude(),
            adoptionCenterDTO.getLongitude()
            , null
        );
    }
}
