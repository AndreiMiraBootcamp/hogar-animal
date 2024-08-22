package es.animal.hogar.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final JwtRequestFilter jwtRequestFilter;

	public SecurityConfig(JwtRequestFilter jwtRequestFilter) {
		this.jwtRequestFilter = jwtRequestFilter;
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
		.csrf(AbstractHttpConfigurer::disable) // Desactivar CSRF porque no estamos usando sesiones
		.authorizeHttpRequests((authorize) -> authorize
				// Permitir acceso sin autenticación a rutas públicas y Swagger UI
				.requestMatchers("/api/**").permitAll()
				.requestMatchers("/v3/api-docs/**").permitAll()
				.requestMatchers("/swagger-ui/**").permitAll() // Swagger UI
				.requestMatchers("/images/**").permitAll()
            	.requestMatchers("/protected/api/**").authenticated() // Requiere autenticación para rutas protegidas
            	.requestMatchers("/api/auth/change-password**").authenticated()
				// Cualquier otra solicitud debe estar autenticada
				.anyRequest().authenticated()
				)
		.sessionManagement((session) -> session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Indica que no se deben usar sesiones
				);

		// Añadir el filtro JWT antes del filtro de autenticación de Spring
		http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
//	
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//	    http
//	        .csrf(AbstractHttpConfigurer::disable)
//	        .authorizeHttpRequests((authorize) -> authorize
//	            .anyRequest().permitAll() // Permitir todas las solicitudes temporalmente
//	        )
//	        .sessionManagement((session) -> session
//	            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//	        );
//
//	    http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
//
//	    return http.build();
//	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
