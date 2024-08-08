package es.animal.hogar.entities;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "favorites", schema = "db_hogar_animal", indexes = {
        @Index(name = "pet_id", columnList = "pet_id"),
        @Index(name = "user_id", columnList = "user_id")
})
public class Favorite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_id")
    private Integer favoriteId;

    @ManyToOne
    @JoinColumn(name = "pet_id", nullable = false, foreignKey = @ForeignKey(name = "adoptions_ibfk_1"))
    private Pet pet;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "adoptions_ibfk_2"))
    private User user; // Cambiar 'adopter' a 'user'

    @Column(name = "created_at")
    private Date createdAt;
}