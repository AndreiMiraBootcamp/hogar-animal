package es.animal.hogar.controllers;

import es.animal.hogar.entities.AdoptionCenter;
import es.animal.hogar.services.AdoptionCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adoption-centers")
public class AdoptionCenterController {

    @Autowired
    private AdoptionCenterService adoptionCenterService;

    @GetMapping
    public List<AdoptionCenter> getAllAdoptionCenters() {
        return adoptionCenterService.getAllAdoptionCenters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdoptionCenter> getAdoptionCenterById(@PathVariable Integer id) {
        AdoptionCenter adoptionCenter = adoptionCenterService.getAdoptionCenterById(id);
        return adoptionCenter != null ? ResponseEntity.ok(adoptionCenter) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public AdoptionCenter createAdoptionCenter(@RequestBody AdoptionCenter adoptionCenter) {
        return adoptionCenterService.createAdoptionCenter(adoptionCenter);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdoptionCenter> updateAdoptionCenter(
            @PathVariable Integer id, @RequestBody AdoptionCenter adoptionCenterDetails) {
        AdoptionCenter updatedAdoptionCenter = adoptionCenterService.updateAdoptionCenter(id, adoptionCenterDetails);
        return updatedAdoptionCenter != null ? ResponseEntity.ok(updatedAdoptionCenter) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdoptionCenter(@PathVariable Integer id) {
        return adoptionCenterService.deleteAdoptionCenter(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
