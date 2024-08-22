package es.animal.hogar.services;

import es.animal.hogar.entities.Favorite;
import es.animal.hogar.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }

    public Favorite getFavoriteById(Integer id) {
        Optional<Favorite> optionalFavorite = favoriteRepository.findById(id);
        return optionalFavorite.orElse(null); // Devuelve null si no se encuentra
    }

    public Favorite createFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    public Favorite updateFavorite(Integer id, Favorite favoriteDetails) {
        return favoriteRepository.findById(id).map(favorite -> {
            favorite.setPet(favoriteDetails.getPet());
            favorite.setAdopter(favoriteDetails.getAdopter());
            favorite.setCreatedAt(favoriteDetails.getCreatedAt());
            return favoriteRepository.save(favorite);
        }).orElse(null); // Devuelve null si no se encuentra
    }

    public boolean deleteFavorite(Integer id) {
        if (favoriteRepository.existsById(id)) {
            favoriteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
