package es.animal.hogar.dtos;

import es.animal.hogar.entities.City;
import es.animal.hogar.entities.User;
import lombok.*;

@Data
public class UserDTO {
    private Integer userId;
    private String username;
    private String email;
    private User.Role role;
    private String phoneNumber;
    private String address;
    private City city;
    private String state;
    private Integer postalCode;
    private byte[] image;
}
