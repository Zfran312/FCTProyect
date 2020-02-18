package com.springboot.proyectofct.app.controllers;

import java.sql.SQLException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.proyectofct.app.models.entity.Login;
import com.springboot.proyectofct.app.models.service.ILoginService;

import org.springframework.web.bind.annotation.PutMapping;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@RestController
public class LoginRestController {
	
	@Autowired
	private ILoginService loginService;
	
	@PostMapping("/saveUserlogin")
	public Login save(@Valid @RequestBody Login login) {
		return loginService.saveLogin(login);
	}

	@PostMapping("/login")
	public Boolean login(@RequestBody Login login) throws SQLException {
		return loginService.checkLogin(login);
	}

	@PostMapping("/login/addattempt")
	public Login addAttempt(@Valid @RequestBody Login login) throws SQLException {
		loginService.addAttempt(login);
		return login;
	}
	
	@PostMapping("/login/checkstatus")
	public Login checkStatus(@Valid @RequestBody Login login) throws SQLException {
		login = loginService.checkStatus(login);
		return login;
	}

	@PutMapping("/modifyUserlogin")
	public Login Modify(@Valid @RequestBody Login login) {
		return loginService.updateLogin(login);
	}
}
