package es.animal.hogar.controllers;

import es.animal.hogar.dtos.StateDTO;
import es.animal.hogar.services.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/states")
public class StateController {

    @Autowired
    private StateService stateService;

    @GetMapping
    public List<StateDTO> getAllStates() {
        return stateService.getAllStates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StateDTO> getStateById(@PathVariable Integer id) {
        StateDTO state = stateService.getStateById(id);
        return state != null ? ResponseEntity.ok(state) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public StateDTO createState(@RequestBody StateDTO stateDTO) {
        return stateService.createState(stateDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StateDTO> updateState(
            @PathVariable Integer id, @RequestBody StateDTO stateDTO) {
        StateDTO updatedState = stateService.updateState(id, stateDTO);
        return updatedState != null ? ResponseEntity.ok(updatedState) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteState(@PathVariable Integer id) {
        return stateService.deleteState(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
