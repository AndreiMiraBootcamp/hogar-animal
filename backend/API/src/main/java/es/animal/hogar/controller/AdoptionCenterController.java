package es.animal.hogar.controller;

import org.springframework.web.bind.annotation.*;

import es.animal.hogar.model.AdoptionCenter;
import es.animal.hogar.service.AdoptionCenterService;

import java.util.List;

@RestController
@RequestMapping("/api/centers")
public class AdoptionCenterController {

	private final AdoptionCenterService adoptionCenterService;

	public AdoptionCenterController(AdoptionCenterService adoptionCenterService) {
		this.adoptionCenterService = adoptionCenterService;
	}

	@GetMapping
	public List<AdoptionCenter> getAllCenters() {
		return adoptionCenterService.getAllCenters();
	}

	@PostMapping
	public void addCenter(@RequestBody AdoptionCenter center) {
		adoptionCenterService.addCenter(center);
	}
}