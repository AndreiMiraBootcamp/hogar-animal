package es.animal.hogar.repository;

import es.animal.hogar.entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    List<Favorite> findByAdopterUserId(Integer userId);
    List<Favorite> findByPetPetId(Integer petId);
    @Query("SELECT f FROM Favorite f WHERE f.adopter.userId = :userId AND f.pet.petId = :petId")
    Optional<Favorite> findByUserIdAndPetId(@Param("petId") Integer petId, @Param("userId") Integer userId);
}
