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
        return stateRepository.findById(id).orElse(null);
    }
}
