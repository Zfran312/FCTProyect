package com.springboot.proyectofct.app.auth.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		if(authentication != null) {
			logger.info("El usuario '"+authentication.getName()+"' ha iniciado sesion!!");
		}
			
		super.onAuthenticationSuccess(request, response, authentication);
	}
	
}
