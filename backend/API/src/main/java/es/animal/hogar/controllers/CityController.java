package es.animal.hogar.controllers;

import es.animal.hogar.dtos.CityDTO;
import es.animal.hogar.services.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping
    public List<CityDTO> getAllCities() {
        return cityService.getAllCities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CityDTO> getCityById(@PathVariable Integer id) {
        CityDTO city = cityService.getCityById(id);
        return city != null ? ResponseEntity.ok(city) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public CityDTO createCity(@RequestBody CityDTO cityDTO) {
        return cityService.createCity(cityDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CityDTO> updateCity(
            @PathVariable Integer id, @RequestBody CityDTO cityDTO) {
        CityDTO updatedCity = cityService.updateCity(id, cityDTO);
        return updatedCity != null ? ResponseEntity.ok(updatedCity) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCity(@PathVariable Integer id) {
        return cityService.deleteCity(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
