package es.animal.hogar.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import es.animal.hogar.entities.City;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionCenterDTO {
    private Integer centerId;
    private String name;
    private City city;
    private Integer userId;
    private String address;
    private String postalCode;
    private String phone;
    private String website;
    private Integer foundationYear;
    private String photoUrl;
    private Double latitude;
    private Double longitude;
}
