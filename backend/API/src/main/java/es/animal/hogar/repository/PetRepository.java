package es.animal.hogar.repository;

import es.animal.hogar.entities.Pet;
import es.animal.hogar.entities.Pet.Gender;
import es.animal.hogar.entities.Pet.Species;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {
    List<Pet> findByAdoptionCenterCenterId(Integer centerId);
    List<Pet> findBySpecies(Species species);
    List<Pet> findByGender(Gender gender);
    List<Pet> findByAvailable(Boolean available);
}
