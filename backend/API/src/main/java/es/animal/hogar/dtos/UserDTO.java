package es.animal.hogar.dtos;

import lombok.Data;

@Data
public class UserDTO {
    private Integer userId;
    private String username;
    private String email;
    private String phoneNumber;
    private String address;
    private CityDTO city; // Cambiado para incluir CityDTO
    private Integer postalCode;
    private byte[] image;

    // CityDTO para representar la ciudad y su estado
    @Data
    public static class CityDTO {
        private Integer cityId;
        private String name;
        private StateDTO state;

        @Data
        public static class StateDTO {
            private Integer stateId;
            private String name;
        }
    }
}
