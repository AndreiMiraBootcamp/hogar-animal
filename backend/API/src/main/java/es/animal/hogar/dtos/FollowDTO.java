package es.animal.hogar.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowDTO {
    private Integer followId;
    private Integer userId;
    private Integer centerId;
}
