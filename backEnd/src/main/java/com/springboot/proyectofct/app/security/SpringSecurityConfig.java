package com.springboot.proyectofct.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.firewall.HttpFirewall;

import com.springboot.proyectofct.app.models.service.implementation.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	/**
	 * Our user detail service implementation
	 */
	@Autowired
	private CustomUserDetailsService userDetailsService;

	/**
	 * BCrypt password encoder
	 */
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	/**
	 * http firewall
	 */
	@Autowired
	private HttpFirewall httpFirewall;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().authorizeRequests()
				.antMatchers(HttpMethod.GET, "/api/users/{id}", "/api/users/filterbydasid/{dasId}",
						"/api/permissionsUser/**", "/api/permissions/**")
				.permitAll()
				.antMatchers(HttpMethod.POST, "/api/login/**", "/api/saveUserlogin", "/api/permissions/save/**")
				.permitAll().antMatchers(HttpMethod.PUT, "/api/permissions").permitAll()
				.antMatchers(HttpMethod.DELETE, "/api/courses/**").permitAll().anyRequest().authenticated().and()
				.httpBasic().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.logout().and().csrf().disable();
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		super.configure(web);
		/**
		 * He aplicado mi propia implementación de este método para poder permitir los
		 * ";" que nos impedía hacer peticiones dede el front.
		 */
		web.httpFirewall(httpFirewall);
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

}
