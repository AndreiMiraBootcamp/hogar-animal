package es.animal.hogar.repository;

import es.animal.hogar.entities.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    List<Follow> findByUserUserId(Integer userId);
    List<Follow> findByAdoptionCenterCenterId(Integer centerId);
}
