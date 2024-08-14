package es.animal.hogar.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import es.animal.hogar.entities.AdoptionCenter;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class AdoptionCenterRepository {

    private final JdbcTemplate jdbcTemplate;

    public AdoptionCenterRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<AdoptionCenter> findAll() {
        String sql = "SELECT * FROM adoption_centers";
        return jdbcTemplate.query(sql, new AdoptionCenterRowMapper());
    }

    @SuppressWarnings("deprecation")
	public AdoptionCenter findById(Long id) {
        String sql = "SELECT * FROM adoption_centers WHERE center_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new AdoptionCenterRowMapper());
    }

    public int save(AdoptionCenter center) {
        String sql = "INSERT INTO adoption_centers (user_id, name, address, city, state, postal_code, phone, website, foundation_year) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, center.getUserId(), center.getName(), center.getAddress(), center.getCity(),
                center.getState(), center.getPostalCode(), center.getPhone(), center.getWebsite(), center.getFoundationYear());
    }

    public int update(AdoptionCenter center) {
        String sql = "UPDATE adoption_centers SET user_id = ?, name = ?, address = ?, city = ?, state = ?, " +
                     "postal_code = ?, phone = ?, website = ?, foundation_year = ? WHERE center_id = ?";
        return jdbcTemplate.update(sql, center.getUserId(), center.getName(), center.getAddress(), center.getCity(),
                center.getState(), center.getPostalCode(), center.getPhone(), center.getWebsite(), center.getFoundationYear(),
                center.getCenterId());
    }

    public int delete(Long id) {
        String sql = "DELETE FROM adoption_centers WHERE center_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    private static class AdoptionCenterRowMapper implements RowMapper<AdoptionCenter> {
        @Override
        public AdoptionCenter mapRow(ResultSet rs, int rowNum) throws SQLException {
            AdoptionCenter center = new AdoptionCenter();
            center.setCenterId(rs.getLong("center_id"));
            center.setUserId(rs.getLong("user_id"));
            center.setName(rs.getString("name"));
            center.setAddress(rs.getString("address"));
            center.setCity(rs.getString("city"));
            center.setState(rs.getString("state"));
            center.setPostalCode(rs.getString("postal_code"));
            center.setPhone(rs.getString("phone"));
            center.setWebsite(rs.getString("website"));
            center.setFoundationYear(rs.getInt("foundation_year"));
            return center;
        }
    }
}
