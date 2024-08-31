package es.animal.hogar.repository;

import es.animal.hogar.entities.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    List<Follow> findByUserUserId(Integer userId);
    List<Follow> findByAdoptionCenterCenterId(Integer centerId);
    
    @Query("SELECT f FROM Follow f WHERE f.user.userId = :userId AND f.adoptionCenter.centerId = :centerId")
    Optional<Follow> findByUserIdAndCenterId(@Param("centerId") Integer centerId, @Param("userId") Integer userId);
}
