package es.animal.hogar.controllers;

import es.animal.hogar.entities.User;
import es.animal.hogar.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

	@Value("${jwt.secret}")
    private String secretKey;
	
	private Key getKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
	
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/token")
    public String generateToken() {
        Key key = getKey();

        String jwt = Jwts.builder()
                .setSubject("admin")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        return jwt;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        User user = userRepository.findByUsername(username);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            String jwt = Jwts.builder()
                    .setSubject(username)
                    .claim("userId", user.getUserId())
                    .claim("role", user.getRole().name())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 horas
                    .signWith(getKey(), SignatureAlgorithm.HS256)
                    .compact();
            return jwt;
        } else {
            throw new BadCredentialsException("Invalid credentials");
        }
    }
    
    @PostMapping("/change-password")
    public String changePassword(@RequestBody ChangePasswordRequest request) {
        // Buscar el usuario por el ID
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> 
            new IllegalArgumentException("Usuario no encontrado"));

        // Verificar si la contraseña actual es correcta
        if (passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            // Cambiar la contraseña
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));
            userRepository.save(user);
            return "Contraseña actualizada con éxito";
        } else {
            throw new IllegalArgumentException("La contraseña actual es incorrecta");
        }
    }
}

class ChangePasswordRequest {
    private Integer userId;
    private String oldPassword;
    private String newPassword;

    // Getters y setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
