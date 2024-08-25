package es.animal.hogar.services;

import es.animal.hogar.dtos.StateDTO;
import es.animal.hogar.entities.State;
import es.animal.hogar.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    public List<StateDTO> getAllStates() {
        List<State> states = stateRepository.findAll();
        return states.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public StateDTO getStateById(Integer id) {
        Optional<State> optionalState = stateRepository.findById(id);
        return optionalState.map(this::convertToDTO).orElse(null);
    }

    public StateDTO createState(StateDTO stateDTO) {
        State state = convertToEntity(stateDTO);
        State savedState = stateRepository.save(state);
        return convertToDTO(savedState);
    }

    public StateDTO updateState(Integer id, StateDTO stateDTO) {
        Optional<State> optionalState = stateRepository.findById(id);
        if (optionalState.isPresent()) {
            State state = optionalState.get();
            state.setName(stateDTO.getName());
            State updatedState = stateRepository.save(state);
            return convertToDTO(updatedState);
        } else {
            return null;
        }
    }

    public boolean deleteState(Integer id) {
        if (stateRepository.existsById(id)) {
            stateRepository.deleteById(id);
            return true;
        }
        return false;
    }

    private StateDTO convertToDTO(State state) {
        return new StateDTO(state.getStateId(), state.getName());
    }

    private State convertToEntity(StateDTO stateDTO) {
        return new State(stateDTO.getStateId(), stateDTO.getName(), null);
    }
}
