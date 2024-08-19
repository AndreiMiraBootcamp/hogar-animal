package es.animal.hogar.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import es.animal.hogar.dtos.UserDTO;
import es.animal.hogar.entities.City;
import es.animal.hogar.entities.State;
import es.animal.hogar.entities.User;
import es.animal.hogar.repository.CityRepository;
import es.animal.hogar.repository.StateRepository;
import es.animal.hogar.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        if (user.getUserId() == null) {
            throw new RuntimeException("User ID must be provided for update");
        }
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }

    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public UserDTO getUserDTOById(Integer userId) {
        User user = getUserById(userId);
        return user != null ? mapToDTO(user) : null;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<UserDTO> getAllUserDTOs() {
        return userRepository.findAll().stream()
            .map(this::mapToDTO)
            .collect(Collectors.toList());
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserDTO getUserDTOByUsername(String username) {
        User user = getUserByUsername(username);
        return user != null ? mapToDTO(user) : null;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDTO getUserDTOByEmail(String email) {
        User user = getUserByEmail(email);
        return user != null ? mapToDTO(user) : null;
    }

    public User patchUser(User user) {
        if (user.getUserId() == null) {
            throw new RuntimeException("User ID must be provided for patch");
        }
        Optional<User> existingUserOpt = userRepository.findById(user.getUserId());
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();
            if (user.getUsername() != null) existingUser.setUsername(user.getUsername());
            if (user.getPassword() != null) existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            if (user.getEmail() != null) existingUser.setEmail(user.getEmail());
            if (user.getRole() != null) existingUser.setRole(user.getRole());
            if (user.getPhoneNumber() != null) existingUser.setPhoneNumber(user.getPhoneNumber());
            if (user.getAddress() != null) existingUser.setAddress(user.getAddress());
            if (user.getCity() != null) existingUser.setCity(getCityById(user.getCity().getCityId()));
            if (user.getState() != null) existingUser.setState(getStateById(user.getState().getStateId()));
            if (user.getPostalCode() != null) existingUser.setPostalCode(user.getPostalCode());
            if (user.getImage() != null) existingUser.setImage(user.getImage());
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public City getCityById(Integer cityId) {
        return cityRepository.findById(cityId).orElse(null);
    }

    public State getStateById(Integer stateId) {
        return stateRepository.findById(stateId).orElse(null);
    }

    private UserDTO mapToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserId(user.getUserId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setAddress(user.getAddress());
        dto.setCity(user.getCity() != null ? user.getCity().getName() : null);
        dto.setState(user.getState() != null ? user.getState().getName() : null);
        dto.setPostalCode(user.getPostalCode());
        dto.setImage(user.getImage());
        return dto;
    }
}