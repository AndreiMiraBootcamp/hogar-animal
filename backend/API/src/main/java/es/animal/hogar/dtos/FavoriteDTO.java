package es.animal.hogar.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteDTO {
    private Integer favoriteId;
    private Integer petId;
    private Integer userId;
}
