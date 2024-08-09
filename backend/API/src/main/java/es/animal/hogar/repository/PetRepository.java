package es.animal.hogar.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import es.animal.hogar.model.Pet;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PetRepository {

	private final JdbcTemplate jdbcTemplate;

	public PetRepository(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public List<Pet> findAll() {
		String sql = "SELECT * FROM pets";
		return jdbcTemplate.query(sql, new PetRowMapper());
	}

	public int save(Pet pet) {
		String sql = "INSERT INTO pets (center_id, name, species, breed, age, gender, description, photo_url, available) " +
				"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
		return jdbcTemplate.update(sql, pet.getCenterId(), pet.getName(), pet.getSpecies(), pet.getBreed(), 
				pet.getAge(), pet.getGender(), pet.getDescription(), pet.getPhotoUrl(), pet.getAvailable());
	}

	private static class PetRowMapper implements RowMapper<Pet> {
		@Override
		public Pet mapRow(ResultSet rs, int rowNum) throws SQLException {
			Pet pet = new Pet();
			pet.setPetId(rs.getLong("pet_id"));
			pet.setCenterId(rs.getLong("center_id"));
			pet.setName(rs.getString("name"));
			pet.setSpecies(rs.getString("species"));
			pet.setBreed(rs.getString("breed"));
			pet.setAge(rs.getInt("age"));
			pet.setGender(rs.getString("gender"));
			pet.setDescription(rs.getString("description"));
			pet.setPhotoUrl(rs.getString("photo_url"));
			pet.setAvailable(rs.getBoolean("available"));
			return pet;
		}
	}
}