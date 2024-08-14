package es.animal.hogar.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.animal.hogar.entities.Follow;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Integer> {

    List<Follow> findByUserUserId(Integer userId);

    List<Follow> findByCenterCenterId(Integer centerId);
}
