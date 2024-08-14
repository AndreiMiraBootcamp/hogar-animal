package es.animal.hogar.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import es.animal.hogar.model.PetImage;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PetImageRepository {

    private final JdbcTemplate jdbcTemplate;

    public PetImageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<PetImage> findAllByPetId(Long petId) {
        String sql = "SELECT * FROM pet_images WHERE pet_id = ?";
        return jdbcTemplate.query(sql, new PetImageRowMapper(), petId);
    }

    public PetImage findById(Long id) {
        String sql = "SELECT * FROM pet_images WHERE pet_image_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new PetImageRowMapper());
    }

    public int save(PetImage petImage) {
        String sql = "INSERT INTO pet_images (pet_id, image) VALUES (?, ?)";
        return jdbcTemplate.update(sql, petImage.getPetId(), petImage.getImage());
    }

    public int update(PetImage petImage) {
        String sql = "UPDATE pet_images SET image = ? WHERE pet_image_id = ?";
        return jdbcTemplate.update(sql, petImage.getImage(), petImage.getPetImageId());
    }

    public int delete(Long id) {
        String sql = "DELETE FROM pet_images WHERE pet_image_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    private static class PetImageRowMapper implements RowMapper<PetImage> {
        @Override
        public PetImage mapRow(ResultSet rs, int rowNum) throws SQLException {
            PetImage petImage = new PetImage();
            petImage.setPetImageId(rs.getLong("pet_image_id"));
            petImage.setPetId(rs.getLong("pet_id"));
            petImage.setImage(rs.getBytes("image"));
            return petImage;
        }
    }
}
