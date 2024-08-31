package es.animal.hogar.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users", schema = "db_hogar_animal")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "username", nullable = false, length = 50, unique = true)
    private String username;

    @JsonIgnore
    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "phone_number", length = 25)
    private String phoneNumber;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = true)
    private City city;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "postal_code")
    private Integer postalCode;
    
    @Lob
    @Column(name = "image")
    @JsonIgnore
    private byte[] image;

    @Column(name = "created_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;

    public enum Role {
        adopter,
        adoption_center,
        admin
    }
    
//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private List<Follow> follows;
//
//    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private List<AdoptionCenter> adoptionCenters;
}
