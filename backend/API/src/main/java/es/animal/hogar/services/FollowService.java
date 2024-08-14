package es.animal.hogar.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.animal.hogar.entities.AdoptionCenter;
import es.animal.hogar.entities.Follow;
import es.animal.hogar.entities.User;
import es.animal.hogar.repositories.AdoptionCenterRepository;
import es.animal.hogar.repositories.FollowRepository;
import es.animal.hogar.repositories.UserRepository;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdoptionCenterRepository adoptionCenterRepository;

    public Follow createFollow(Integer userId, Integer centerId) {
        Optional<User> userOpt = userRepository.findById(userId);
        Optional<AdoptionCenter> centerOpt = adoptionCenterRepository.findById(centerId);

        if (userOpt.isPresent() && centerOpt.isPresent()) {
            Follow follow = new Follow();
            follow.setUser(userOpt.get());
            follow.setCenter(centerOpt.get());
            follow.setCreatedAt(new Date()); // Set current date/time

            return followRepository.save(follow);
        } else {
            // Handle the case where either the user or center is not found
            throw new RuntimeException("User or Adoption Center not found");
        }
    }

    public Follow updateFollow(Follow follow) {
        return followRepository.save(follow);
    }

    public void deleteFollow(Integer followId) {
        followRepository.deleteById(followId);
    }

    public Follow getFollowById(Integer followId) {
        Optional<Follow> follow = followRepository.findById(followId);
        return follow.orElse(null);
    }

    public List<Follow> getAllFollows() {
        return followRepository.findAll();
    }

    public List<Follow> getFollowsByUserId(Integer userId) {
        return followRepository.findByUserUserId(userId);
    }

    public List<Follow> getFollowsByCenterId(Integer centerId) {
        return followRepository.findByCenterCenterId(centerId);
    }

    public Follow patchFollow(Integer id, Follow followDetails) {
        Optional<Follow> existingFollow = followRepository.findById(id);
        if (existingFollow.isPresent()) {
            Follow follow = existingFollow.get();
            if (followDetails.getUser() != null) {
                follow.setUser(followDetails.getUser());
            }
            if (followDetails.getCenter() != null) {
                follow.setCenter(followDetails.getCenter());
            }
            if (followDetails.getCreatedAt() != null) {
                follow.setCreatedAt(followDetails.getCreatedAt());
            }
            return followRepository.save(follow);
        } else {
            return null;
        }
    }
}