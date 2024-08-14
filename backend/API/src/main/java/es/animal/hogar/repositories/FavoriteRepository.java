package es.animal.hogar.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.animal.hogar.entities.Favorite;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    
    List<Favorite> findByUserUserId(Integer userId);

    List<Favorite> findByPetPetId(Integer petId);
}
