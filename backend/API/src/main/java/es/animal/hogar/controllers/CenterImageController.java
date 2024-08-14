package es.animal.hogar.controllers;

import org.springframework.web.bind.annotation.*;

import es.animal.hogar.entities.CenterImage;
import es.animal.hogar.services.CenterImageService;

import java.util.List;

@RestController
@RequestMapping("/center-images")
public class CenterImageController {

    private final CenterImageService centerImageService;

    public CenterImageController(CenterImageService centerImageService) {
        this.centerImageService = centerImageService;
    }

    @PostMapping("get/{centerId}")
    public List<CenterImage> getImagesForCenter(@PathVariable Long centerId) {
        return centerImageService.getImagesForCenter(centerId);
    }

    @PostMapping("add")
    public void addCenterImage(@RequestBody CenterImage centerImage) {
        centerImageService.addCenterImage(centerImage);
    }

    @PutMapping("update/{id}")
    public void updateCenterImage(@PathVariable Long id, @RequestBody CenterImage centerImage) {
        centerImageService.updateCenterImage(id, centerImage);
    }

    @DeleteMapping("delete/{id}")
    public void deleteCenterImage(@PathVariable Long id) {
        centerImageService.deleteCenterImage(id);
    }
}
