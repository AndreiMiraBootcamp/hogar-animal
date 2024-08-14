package es.animal.hogar.dtos;

import java.sql.Timestamp;
import es.animal.hogar.entities.User;
import lombok.Data;

@Data
public class UserDTO {
    private Integer userId;
    private String username;
    private String email;
    private User.Role role;
    private String phoneNumber;
    private String address;
    private String city;
    private String state;
    private Integer postalCode;
    private Timestamp createdAt;
}
