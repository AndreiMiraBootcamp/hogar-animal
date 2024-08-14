package es.animal.hogar.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.animal.hogar.entities.Favorite;
import es.animal.hogar.repository.FavoriteRepository;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    public Favorite createFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    public Favorite updateFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    public void deleteFavorite(Integer favoriteId) {
        favoriteRepository.deleteById(favoriteId);
    }

    public Favorite getFavoriteById(Integer favoriteId) {
        Optional<Favorite> favorite = favoriteRepository.findById(favoriteId);
        return favorite.orElse(null);
    }

    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }

    public List<Favorite> getFavoritesByUserId(Integer userId) {
        return favoriteRepository.findByUserUserId(userId);
    }

    public List<Favorite> getFavoritesByPetId(Integer petId) {
        return favoriteRepository.findByPetPetId(petId);
    }

    public Favorite patchFavorite(Integer id, Favorite favoriteDetails) {
        Optional<Favorite> existingFavorite = favoriteRepository.findById(id);
        if (existingFavorite.isPresent()) {
            Favorite favorite = existingFavorite.get();
            if (favoriteDetails.getPet() != null) {
                if (favoriteDetails.getPet().getPetId() != null) {
                    favorite.setPet(favoriteDetails.getPet());
                }
            }
            if (favoriteDetails.getUser() != null) {
                if (favoriteDetails.getUser().getUserId() != null) {
                    favorite.setUser(favoriteDetails.getUser());
                }
            }
            if (favoriteDetails.getCreatedAt() != null) {
                favorite.setCreatedAt(favoriteDetails.getCreatedAt());
            }
            return favoriteRepository.save(favorite);
        } else {
            return null;
        }
    }
}