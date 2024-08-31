package es.animal.hogar.services;

import es.animal.hogar.dtos.FollowDTO;
import es.animal.hogar.entities.AdoptionCenter;
import es.animal.hogar.entities.Follow;
import es.animal.hogar.entities.User;
import es.animal.hogar.repository.AdoptionCenterRepository;
import es.animal.hogar.repository.FollowRepository;
import es.animal.hogar.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdoptionCenterRepository adoptionCenterRepository;

    public List<Follow> getAllFollows() {
        return followRepository.findAll();
    }

    // Método para obtener follows por userId y convertirlos a DTOs
    public List<FollowDTO> getFollowsByUserId(Integer userId) {
        List<Follow> follows = followRepository.findByUserUserId(userId);
        return follows.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Follow createFollow(Integer centerId, Integer userId) {
        Optional<AdoptionCenter> centerOptional = adoptionCenterRepository.findById(centerId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (centerOptional.isPresent() && userOptional.isPresent()) {
            Follow follow = new Follow();
            follow.setAdoptionCenter(centerOptional.get());
            follow.setUser(userOptional.get());
            follow.setCreatedAt(new Date(System.currentTimeMillis()));
            return followRepository.save(follow);
        } else {
            return null;
        }
    }

    public Follow updateFollow(Integer followId, Integer userId, Follow followDetails) {
        return followRepository.findById(followId).map(follow -> {
            if (follow.getUser().getUserId().equals(userId)) {
                follow.setAdoptionCenter(followDetails.getAdoptionCenter());
                return followRepository.save(follow);
            }
            return null;
        }).orElse(null);
    }

    public boolean deleteFollow(Integer centerId, Integer userId) {
        Optional<Follow> followOptional = followRepository.findByUserIdAndCenterId(centerId, userId);
        if (followOptional.isPresent()) {
            followRepository.delete(followOptional.get());
            return true;
        }
        return false;
    }
    
    // Método para convertir Follow a FollowDTO
    private FollowDTO convertToDTO(Follow follow) {
        FollowDTO dto = new FollowDTO();
        dto.setFollowId(follow.getFollowId());
        dto.setUserId(follow.getUser().getUserId());
        dto.setCenterId(follow.getAdoptionCenter().getCenterId());
        return dto;
    }
}
