package com.SalonSphereServer.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.SalonSphereServer.jwtsecurity.JwtAuthenticationEntryPoint;
import com.SalonSphereServer.jwtsecurity.JwtAuthenticationFilter;



@Configuration
public class SecurityConfiguration {

	@Autowired
	private JwtAuthenticationEntryPoint point;

	@Autowired
	private JwtAuthenticationFilter filter;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	// @SuppressWarnings("unused")
	// private Logger logger = LoggerFactory.getLogger(SecurityConfiguration.class);

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(requests -> requests.requestMatchers("/login").permitAll()
						.requestMatchers("/register").permitAll()
						.requestMatchers("/customer/**").permitAll()
						.requestMatchers("/sendOTP/**").permitAll()
						.requestMatchers("/update-password/**").permitAll()
						.anyRequest().authenticated())
				.exceptionHandling(ex -> ex.authenticationEntryPoint(point))
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	DaoAuthenticationProvider daoAuthenticationProvider() {
		DaoAuthenticationProvider Provider = new DaoAuthenticationProvider();
		Provider.setUserDetailsService(userDetailsService);
		Provider.setPasswordEncoder(passwordEncoder);
		return Provider;
	}
}
