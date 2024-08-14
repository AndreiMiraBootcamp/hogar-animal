package es.animal.hogar.controller;

import org.springframework.web.bind.annotation.*;

import es.animal.hogar.model.AdoptionCenter;
import es.animal.hogar.service.AdoptionCenterService;

import java.util.List;

@RestController
@RequestMapping("/centers")
public class AdoptionCenterController {

    private final AdoptionCenterService adoptionCenterService;

    public AdoptionCenterController(AdoptionCenterService adoptionCenterService) {
        this.adoptionCenterService = adoptionCenterService;
    }

    @GetMapping("all")
    public List<AdoptionCenter> getAllCenters() {
        return adoptionCenterService.getAllCenters();
    }

    @PostMapping("add")
    public void addCenter(@RequestBody AdoptionCenter center) {
        adoptionCenterService.addCenter(center);
    }

    @PutMapping("update/{id}")
    public void updateCenter(@PathVariable Long id, @RequestBody AdoptionCenter center) {
        adoptionCenterService.updateCenter(id, center);
    }

    @DeleteMapping("delete/{id}")
    public void deleteCenter(@PathVariable Long id) {
        adoptionCenterService.deleteCenter(id);
    }
}
