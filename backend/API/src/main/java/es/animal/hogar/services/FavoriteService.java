package es.animal.hogar.services;

import es.animal.hogar.entities.Favorite;
import es.animal.hogar.entities.Pet;
import es.animal.hogar.entities.User;
import es.animal.hogar.repository.FavoriteRepository;
import es.animal.hogar.repository.PetRepository;
import es.animal.hogar.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Favorite> getAllFavorites() {
        return favoriteRepository.findAll();
    }

    public Favorite getFavoriteById(Integer id) {
        Optional<Favorite> optionalFavorite = favoriteRepository.findById(id);
        return optionalFavorite.orElse(null);
    }

    public Favorite createFavorite(Integer petId, Integer userId) {
        Optional<Pet> petOptional = petRepository.findById(petId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (petOptional.isPresent() && userOptional.isPresent()) {
            Pet pet = petOptional.get();
            User user = userOptional.get();

            Favorite favorite = new Favorite();
            favorite.setPet(pet);
            favorite.setAdopter(user);
            favorite.setCreatedAt(new Date(System.currentTimeMillis()));

            return favoriteRepository.save(favorite);
        } else {
            return null; // Handle the case where pet or user is not found
        }
    }

    public Favorite updateFavorite(Integer favoriteId, Integer userId, Favorite favoriteDetails) {
        return favoriteRepository.findById(favoriteId).map(favorite -> {
            if (favorite.getAdopter().getUserId().equals(userId)) {
                favorite.setPet(favoriteDetails.getPet()); // Solo si tiene sentido actualizar la mascota
                // No actualices la fecha ni el usuario, si eso no debe cambiar
                return favoriteRepository.save(favorite);
            }
            return null;
        }).orElse(null);
    }


    public boolean deleteFavorite(Integer id) {
        if (favoriteRepository.existsById(id)) {
            favoriteRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
