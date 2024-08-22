package es.animal.hogar.controllers;

import es.animal.hogar.entities.State;
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
    public List<State> getAllStates() {
        return stateService.getAllStates();
    }

    @GetMapping("/{id}")
    public ResponseEntity<State> getStateById(@PathVariable Integer id) {
        State state = stateService.getStateById(id);
        return state != null ? ResponseEntity.ok(state) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public State createState(@RequestBody State state) {
        return stateService.createState(state);
    }

    @PutMapping("/{id}")
    public ResponseEntity<State> updateState(
            @PathVariable Integer id, @RequestBody State stateDetails) {
        State updatedState = stateService.updateState(id, stateDetails);
        return updatedState != null ? ResponseEntity.ok(updatedState) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteState(@PathVariable Integer id) {
        return stateService.deleteState(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
