package es.animal.hogar.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cities", schema = "db_hogar_animal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cityId;

    @Column(nullable = false, length = 45)
    private String name;

    @ManyToOne
    @JoinColumn(name = "state_id", nullable = false)
    private State state;

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    private Set<User> users;

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    private Set<AdoptionCenter> adoptionCenters;

}
