package es.animal.hogar.services;

import es.animal.hogar.entities.State;
import es.animal.hogar.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    public List<State> getAllStates() {
        return stateRepository.findAll();
    }

    public State getStateById(Integer id) {
        Optional<State> optionalState = stateRepository.findById(id);
        return optionalState.orElse(null); // Devuelve null si no se encuentra
    }

    public State createState(State state) {
        return stateRepository.save(state);
    }

    public State updateState(Integer id, State stateDetails) {
        return stateRepository.findById(id).map(state -> {
            state.setName(stateDetails.getName());
            return stateRepository.save(state);
        }).orElse(null); // Devuelve null si no se encuentra
    }

    public boolean deleteState(Integer id) {
        if (stateRepository.existsById(id)) {
            stateRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
