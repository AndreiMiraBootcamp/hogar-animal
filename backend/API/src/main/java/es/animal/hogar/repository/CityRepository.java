package es.animal.hogar.repository;

import es.animal.hogar.entities.City;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
    List<City> findByStateStateId(Integer stateId);
}
