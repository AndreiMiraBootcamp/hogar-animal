package es.animal.hogar.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "states", schema = "db_hogar_animal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stateId;

    @Column(nullable = false, length = 45)
    private String name;

    @OneToMany(mappedBy = "state")
    @JsonIgnore
    private Set<City> cities;
}
