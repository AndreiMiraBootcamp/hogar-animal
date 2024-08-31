package es.animal.hogar.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import es.animal.hogar.entities.Pet.Gender;
import es.animal.hogar.entities.Pet.Species;
import java.sql.Date; // Importar java.sql.Date

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PetDTO {
    private Integer petId;
    private String name;
    private Species species;
    private String breed;
    private Integer age;
    private Gender gender;
    private String description;
    private String photoUrl;
    private Boolean available;
    private Integer centerId;
    private Date createdAt; 
}
