package es.animal.hogar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import es.animal.hogar.entities.Pet;
import es.animal.hogar.entities.Pet.Gender;
import es.animal.hogar.entities.Pet.Species;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {
    List<Pet> findByAdoptionCenterCenterId(Integer centerId);
    List<Pet> findBySpecies(Species species);
    List<Pet> findByGender(Gender gender);
    List<Pet> findByAvailable(Boolean available);
    
    @Query("SELECT p.species, COUNT(p) FROM Pet p WHERE p.adoptionCenter.centerId = :centerId GROUP BY p.species")
    List<Object[]> countPetsBySpeciesInCenter(@Param("centerId") Integer centerId);
}