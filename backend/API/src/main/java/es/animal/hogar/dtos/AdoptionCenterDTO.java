package es.animal.hogar.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdoptionCenterDTO {
    private Integer centerId;
    private String name;
    private Integer cityId;
    private Integer userId;
    private String address;
    private String postalCode;
    private String phone;
    private String website;
    private Integer foundationYear;
    private String photoUrl;
}
