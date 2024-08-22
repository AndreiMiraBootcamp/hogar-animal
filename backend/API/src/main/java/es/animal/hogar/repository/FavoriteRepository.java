package es.animal.hogar.repository;

import es.animal.hogar.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    List<Favorite> findByAdopterUserId(Integer userId);
    List<Favorite> findByPetPetId(Integer petId);
}
