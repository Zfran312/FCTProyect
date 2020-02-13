package com.springboot.proyectofct.app.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.proyectofct.app.models.entity.Login;
import com.springboot.proyectofct.app.models.entity.User;
import com.springboot.proyectofct.app.models.service.ILoginService;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@RestController
public class LoginRestController {
	
	@Autowired
	private ILoginService loginService;
	

	@PostMapping("/login")
	public Login save(@Valid @RequestBody Login login, @RequestBody User user) {
				
		String loginDas = login.getDasId();
		long loginId = login.getId();
		
		String userDas = user.getDasId();
		long userId = user.getIdUser();
		
		if(!loginDas.equals(userDas)  || loginId != userId) {
			return null;
		} else {
			return loginService.saveLogin(login);
		}
	}
	
}
