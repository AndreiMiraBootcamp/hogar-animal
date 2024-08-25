package es.animal.hogar.repository;

import es.animal.hogar.entities.Pet;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {
}
