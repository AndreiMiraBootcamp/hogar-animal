package es.animal.hogar.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "favorites", schema = "db_hogar_animal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer favoriteId;

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false)
    @JsonIgnore
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "adopter_id", nullable = false)
    @JsonIgnore
    private User adopter;

    @Column(name = "created_at", nullable = false)
    @JsonIgnore
    private Date createdAt;
}
