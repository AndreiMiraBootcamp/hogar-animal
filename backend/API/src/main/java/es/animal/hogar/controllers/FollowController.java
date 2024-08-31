package es.animal.hogar.controllers;

import es.animal.hogar.dtos.FollowDTO;
import es.animal.hogar.entities.Follow;
import es.animal.hogar.services.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/follows")
public class FollowController {

    @Autowired
    private FollowService followService;

    @GetMapping
    public List<Follow> getAllFollows() {
        return followService.getAllFollows();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FollowDTO>> getFollowsByUserId(@PathVariable Integer userId) {
        List<FollowDTO> follows = followService.getFollowsByUserId(userId);
        return !follows.isEmpty() ? ResponseEntity.ok(follows) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Follow> createFollow(
            @RequestParam Integer centerId, @RequestParam Integer userId) {
        Follow createdFollow = followService.createFollow(centerId, userId);
        return createdFollow != null ? ResponseEntity.ok(createdFollow) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{followId}/user/{userId}")
    public ResponseEntity<Follow> updateFollow(
            @PathVariable Integer followId, @PathVariable Integer userId, @RequestBody Follow followDetails) {
        Follow updatedFollow = followService.updateFollow(followId, userId, followDetails);
        return updatedFollow != null ? ResponseEntity.ok(updatedFollow) : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteFollow(
            @RequestParam Integer centerId, @RequestParam Integer userId) {
        boolean deleted = followService.deleteFollow(centerId, userId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
