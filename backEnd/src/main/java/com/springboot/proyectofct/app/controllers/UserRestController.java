package com.springboot.proyectofct.app.controllers;

import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.proyectofct.app.models.entity.User;
import com.springboot.proyectofct.app.models.service.IUserService;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@RestController
public class UserRestController {
	
	@Autowired
	private IUserService userService;
	
	@GetMapping("/listar")
	public List<User> ListUsers() {
		return userService.findAll();
	}
	
	@GetMapping("/users/{id}")
	public User getUser(@PathVariable Long id) {
		return userService.findById(id);
	}
	
	@PostMapping("/users")
	public User saveUser(@Valid @RequestBody User user) {
		return userService.saveUser(user);
	}
	
	@PutMapping("/users")
	public User updateUser(@Valid @RequestBody User user) {	
		return userService.saveUser(user);
		
	}
	
	@DeleteMapping("/users/{id}")
	public void deleteUser(@PathVariable Long id) {
		 userService.deleteUserById(id);
	}
}
