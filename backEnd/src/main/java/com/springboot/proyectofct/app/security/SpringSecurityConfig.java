package com.springboot.proyectofct.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.springboot.proyectofct.app.auth.handler.LoginSuccessHandler;




public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private LoginSuccessHandler successHandler;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		
		
		super.configure(http);
	}

	
	
}
