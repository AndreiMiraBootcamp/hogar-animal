package es.animal.hogar.controller;

import org.springframework.web.bind.annotation.*;

import es.animal.hogar.model.CenterImage;
import es.animal.hogar.service.CenterImageService;

import java.util.List;

@RestController
@RequestMapping("/api/center-images")
public class CenterImageController {

	private final CenterImageService centerImageService;

	public CenterImageController(CenterImageService centerImageService) {
		this.centerImageService = centerImageService;
	}

	@GetMapping("/{centerId}")
	public List<CenterImage> getImagesForCenter(@PathVariable Long centerId) {
		return centerImageService.getImagesForCenter(centerId);
	}

	@PostMapping
	public void addCenterImage(@RequestBody CenterImage centerImage) {
		centerImageService.addCenterImage(centerImage);
	}
}