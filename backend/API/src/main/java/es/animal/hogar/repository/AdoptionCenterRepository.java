package es.animal.hogar.repository;

import es.animal.hogar.entities.AdoptionCenter;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionCenterRepository extends JpaRepository<AdoptionCenter, Integer> {
	
	@EntityGraph(attributePaths = {"city", "user"})
	List<AdoptionCenter> findByCityCityId(Integer cityId);

	@EntityGraph(attributePaths = {"city", "user"})
	List<AdoptionCenter> findByUserUserId(Integer userId);
}
