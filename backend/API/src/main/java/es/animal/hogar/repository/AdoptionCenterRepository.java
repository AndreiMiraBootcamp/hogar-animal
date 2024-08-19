package es.animal.hogar.repository;

import es.animal.hogar.entities.AdoptionCenter;
import es.animal.hogar.entities.City;
import es.animal.hogar.entities.State;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class AdoptionCenterRepository {

    private final JdbcTemplate jdbcTemplate;
    private final CityRepository cityRepository;
    private final StateRepository stateRepository;

    public AdoptionCenterRepository(JdbcTemplate jdbcTemplate, CityRepository cityRepository, StateRepository stateRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.cityRepository = cityRepository;
        this.stateRepository = stateRepository;
    }

    public List<AdoptionCenter> findAll() {
        String sql = "SELECT * FROM adoption_centers";
        return jdbcTemplate.query(sql, new AdoptionCenterRowMapper());
    }

    public AdoptionCenter findById(Long id) {
        String sql = "SELECT * FROM adoption_centers WHERE center_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new AdoptionCenterRowMapper());
    }

    public int save(AdoptionCenter center) {
        String sql = "INSERT INTO adoption_centers (user_id, name, address, city_id, state_id, postal_code, phone, website, foundation_year) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, center.getUserId(), center.getName(), center.getAddress(), center.getCity().getCityId(),
                center.getState().getStateId(), center.getPostalCode(), center.getPhone(), center.getWebsite(), center.getFoundationYear());
    }

    public int update(AdoptionCenter center) {
        String sql = "UPDATE adoption_centers SET user_id = ?, name = ?, address = ?, city_id = ?, state_id = ?, " +
                     "postal_code = ?, phone = ?, website = ?, foundation_year = ? WHERE center_id = ?";
        return jdbcTemplate.update(sql, center.getUserId(), center.getName(), center.getAddress(), center.getCity().getCityId(),
                center.getState().getStateId(), center.getPostalCode(), center.getPhone(), center.getWebsite(), center.getFoundationYear(),
                center.getCenterId());
    }

    public int delete(Long id) {
        String sql = "DELETE FROM adoption_centers WHERE center_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    private class AdoptionCenterRowMapper implements RowMapper<AdoptionCenter> {
        @Override
        public AdoptionCenter mapRow(ResultSet rs, int rowNum) throws SQLException {
            AdoptionCenter center = new AdoptionCenter();
            center.setCenterId(rs.getLong("center_id"));
            center.setUserId(rs.getLong("user_id"));
            center.setName(rs.getString("name"));
            center.setAddress(rs.getString("address"));

            // Obtener City y State usando sus IDs de tipo Integer
            Integer cityId = rs.getInt("city_id");
            Integer stateId = rs.getInt("state_id");
            City city = cityRepository.findById(cityId).orElse(null);
            State state = stateRepository.findById(stateId).orElse(null);
            center.setCity(city);
            center.setState(state);

            center.setPostalCode(rs.getString("postal_code"));
            center.setPhone(rs.getString("phone"));
            center.setWebsite(rs.getString("website"));
            center.setFoundationYear(rs.getInt("foundation_year"));
            return center;
        }
    }
}
