package es.animal.hogar.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CityDTO {
    private Integer cityId;
    private String name;
    private Integer stateId;
}
