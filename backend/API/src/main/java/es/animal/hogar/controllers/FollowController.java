package es.animal.hogar.controllers;

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

    @GetMapping("/{id}")
    public ResponseEntity<Follow> getFollowById(@PathVariable Integer id) {
        Follow follow = followService.getFollowById(id);
        return follow != null ? ResponseEntity.ok(follow) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Follow createFollow(@RequestBody Follow follow) {
        return followService.createFollow(follow);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Follow> updateFollow(
            @PathVariable Integer id, @RequestBody Follow followDetails) {
        Follow updatedFollow = followService.updateFollow(id, followDetails);
        return updatedFollow != null ? ResponseEntity.ok(updatedFollow) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFollow(@PathVariable Integer id) {
        return followService.deleteFollow(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
