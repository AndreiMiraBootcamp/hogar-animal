package es.animal.hogar.controllers;

import es.animal.hogar.dtos.FavoriteDTO;
import es.animal.hogar.entities.Favorite;
import es.animal.hogar.services.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping
    public List<Favorite> getAllFavorites() {
        return favoriteService.getAllFavorites();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FavoriteDTO>> getFavoritesByUserId(@PathVariable Integer userId) {
        List<FavoriteDTO> favorites = favoriteService.getFavoritesByUserId(userId);
        return !favorites.isEmpty() ? ResponseEntity.ok(favorites) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Favorite> createFavorite(
            @RequestParam Integer petId, @RequestParam Integer userId) {
        Favorite createdFavorite = favoriteService.createFavorite(petId, userId);
        return createdFavorite != null ? ResponseEntity.ok(createdFavorite) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{favoriteId}/user/{userId}")
    public ResponseEntity<Favorite> updateFavorite(
            @PathVariable Integer favoriteId, @PathVariable Integer userId, @RequestBody Favorite favoriteDetails) {
        Favorite updatedFavorite = favoriteService.updateFavorite(favoriteId, userId, favoriteDetails);
        return updatedFavorite != null ? ResponseEntity.ok(updatedFavorite) : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteFavorite(
            @RequestParam Integer petId, @RequestParam Integer userId) {
        boolean deleted = favoriteService.deleteFavorite(petId, userId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}



