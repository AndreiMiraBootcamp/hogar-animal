package es.animal.hogar.services;

import es.animal.hogar.entities.Follow;
import es.animal.hogar.repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FollowService {

    @Autowired
    private FollowRepository followRepository;

    public List<Follow> getAllFollows() {
        return followRepository.findAll();
    }

    public Follow getFollowById(Integer id) {
        Optional<Follow> optionalFollow = followRepository.findById(id);
        return optionalFollow.orElse(null); // Devuelve null si no se encuentra
    }

    public Follow createFollow(Follow follow) {
        return followRepository.save(follow);
    }

    public Follow updateFollow(Integer id, Follow followDetails) {
        return followRepository.findById(id).map(follow -> {
            follow.setUser(followDetails.getUser());
            follow.setAdoptionCenter(followDetails.getAdoptionCenter());
            follow.setCreatedAt(followDetails.getCreatedAt());
            return followRepository.save(follow);
        }).orElse(null); // Devuelve null si no se encuentra
    }

    public boolean deleteFollow(Integer id) {
        if (followRepository.existsById(id)) {
            followRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
