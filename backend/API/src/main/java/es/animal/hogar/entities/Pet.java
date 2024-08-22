package es.animal.hogar.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "pets", schema = "db_hogar_animal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer petId;

    @ManyToOne
    @JoinColumn(name = "center_id", nullable = false)
    @JsonIgnore
    private AdoptionCenter adoptionCenter;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Species species;

    @Column(length = 100)
    private String breed;

    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "photoURL", length = 255)
    private String photoUrl;

    @Column(nullable = false)
    private Boolean available;

    @Column(name = "created_at")
    private java.sql.Date createdAt;

    @OneToMany(mappedBy = "pet")
    @JsonIgnore
    private Set<Favorite> favorites;
    
    public enum Species {
        dog, cat, other
    }

    public enum Gender {
        male, female
    }
}
