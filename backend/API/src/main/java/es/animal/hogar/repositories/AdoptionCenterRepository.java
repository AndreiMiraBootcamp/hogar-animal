package es.animal.hogar.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import es.animal.hogar.entities.AdoptionCenter;

@Repository
public interface AdoptionCenterRepository extends JpaRepository<AdoptionCenter, Integer> {
	
}
