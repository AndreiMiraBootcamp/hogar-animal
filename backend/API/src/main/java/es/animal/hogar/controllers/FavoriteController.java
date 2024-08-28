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

    @GetMapping("/{id}")
    public ResponseEntity<Favorite> getFavoriteById(@PathVariable Integer id) {
        Favorite favorite = favoriteService.getFavoriteById(id);
        return favorite != null ? ResponseEntity.ok(favorite) : ResponseEntity.notFound().build();
    }

    // Modificado para aceptar petId y userId
    @PostMapping
    public ResponseEntity<Favorite> createFavorite(@RequestBody FavoriteDTO favoriteDTO) {
        Favorite createdFavorite = favoriteService.createFavorite(favoriteDTO.getPetId(), favoriteDTO.getUserId());
        return createdFavorite != null ? ResponseEntity.ok(createdFavorite) : ResponseEntity.badRequest().build();
    }


    // Modificado para aceptar userId
    @PutMapping("/{favoriteId}/user/{userId}")
    public ResponseEntity<Favorite> updateFavorite(
            @PathVariable Integer favoriteId, @PathVariable Integer userId, @RequestBody Favorite favoriteDetails) {
        Favorite updatedFavorite = favoriteService.updateFavorite(favoriteId, userId, favoriteDetails);
        return updatedFavorite != null ? ResponseEntity.ok(updatedFavorite) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Integer id) {
        return favoriteService.deleteFavorite(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
