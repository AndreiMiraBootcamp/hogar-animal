package es.animal.hogar.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "follows", schema = "db_hogar_animal")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer followId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "center_id", nullable = false)
    @JsonIgnore
    private AdoptionCenter adoptionCenter;

    @Column(name = "created_at", nullable = false)
    private Date createdAt;
}
