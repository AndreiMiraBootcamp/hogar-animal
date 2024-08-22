package es.animal.hogar.controllers;

import es.animal.hogar.entities.City;
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
    public List<City> getAllCities() {
        return cityService.getAllCities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> getCityById(@PathVariable Integer id) {
        City city = cityService.getCityById(id);
        return city != null ? ResponseEntity.ok(city) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public City createCity(@RequestBody City city) {
        return cityService.createCity(city);
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> updateCity(
            @PathVariable Integer id, @RequestBody City cityDetails) {
        City updatedCity = cityService.updateCity(id, cityDetails);
        return updatedCity != null ? ResponseEntity.ok(updatedCity) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCity(@PathVariable Integer id) {
        return cityService.deleteCity(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
