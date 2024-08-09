package es.animal.hogar.service;

import org.springframework.stereotype.Service;

import es.animal.hogar.model.CenterImage;
import es.animal.hogar.repository.CenterImageRepository;

import java.util.List;

@Service
public class CenterImageService {

    private final CenterImageRepository centerImageRepository;

    public CenterImageService(CenterImageRepository centerImageRepository) {
        this.centerImageRepository = centerImageRepository;
    }

    public List<CenterImage> getImagesForCenter(Long centerId) {
        return centerImageRepository.findAllByCenterId(centerId);
    }

    public void addCenterImage(CenterImage centerImage) {
        centerImageRepository.save(centerImage);
    }
}