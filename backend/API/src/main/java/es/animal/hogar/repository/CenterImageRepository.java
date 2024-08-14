package es.animal.hogar.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import es.animal.hogar.entities.CenterImage;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class CenterImageRepository {

    private final JdbcTemplate jdbcTemplate;

    public CenterImageRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<CenterImage> findAllByCenterId(Long centerId) {
        String sql = "SELECT * FROM center_images WHERE center_id = ?";
        return jdbcTemplate.query(sql, new CenterImageRowMapper(), centerId);
    }

    public CenterImage findById(Long id) {
        String sql = "SELECT * FROM center_images WHERE center_image_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new CenterImageRowMapper());
    }

    public int save(CenterImage centerImage) {
        String sql = "INSERT INTO center_images (center_id, image) VALUES (?, ?)";
        return jdbcTemplate.update(sql, centerImage.getCenterId(), centerImage.getImage());
    }

    public int update(CenterImage centerImage) {
        String sql = "UPDATE center_images SET image = ? WHERE center_image_id = ?";
        return jdbcTemplate.update(sql, centerImage.getImage(), centerImage.getCenterImageId());
    }

    public int delete(Long id) {
        String sql = "DELETE FROM center_images WHERE center_image_id = ?";
        return jdbcTemplate.update(sql, id);
    }

    private static class CenterImageRowMapper implements RowMapper<CenterImage> {
        @Override
        public CenterImage mapRow(ResultSet rs, int rowNum) throws SQLException {
            CenterImage centerImage = new CenterImage();
            centerImage.setCenterImageId(rs.getLong("center_image_id"));
            centerImage.setCenterId(rs.getLong("center_id"));
            centerImage.setImage(rs.getBytes("image"));
            return centerImage;
        }
    }
}
