package es.animal.hogar.controllers;

import es.animal.hogar.dtos.AdoptionCenterDTO;
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
    public List<AdoptionCenterDTO> getAllAdoptionCenters() {
        return adoptionCenterService.getAllAdoptionCenters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdoptionCenterDTO> getAdoptionCenterById(@PathVariable Integer id) {
        AdoptionCenterDTO adoptionCenter = adoptionCenterService.getAdoptionCenterById(id);
        return adoptionCenter != null ? ResponseEntity.ok(adoptionCenter) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<AdoptionCenterDTO> createAdoptionCenter(@RequestBody AdoptionCenterDTO adoptionCenterDTO) {
        if (adoptionCenterDTO.getLatitude() == null || adoptionCenterDTO.getLongitude() == null) {
            return ResponseEntity.badRequest().body(null); // Respuesta con error si faltan las coordenadas
        }
        AdoptionCenterDTO createdAdoptionCenter = adoptionCenterService.createAdoptionCenter(adoptionCenterDTO);
        return ResponseEntity.ok(createdAdoptionCenter);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdoptionCenterDTO> updateAdoptionCenter(
            @PathVariable Integer id, @RequestBody AdoptionCenterDTO adoptionCenterDTO) {
        if (adoptionCenterDTO.getLatitude() == null || adoptionCenterDTO.getLongitude() == null) {
            return ResponseEntity.badRequest().body(null); // Respuesta con error si faltan las coordenadas
        }
        AdoptionCenterDTO updatedAdoptionCenter = adoptionCenterService.updateAdoptionCenter(id, adoptionCenterDTO);
        return updatedAdoptionCenter != null ? ResponseEntity.ok(updatedAdoptionCenter) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdoptionCenter(@PathVariable Integer id) {
        return adoptionCenterService.deleteAdoptionCenter(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
