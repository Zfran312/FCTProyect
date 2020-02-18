package com.springboot.proyectofct.app.controllers;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

	@GetMapping("/users")
	public List<User> ListUsers() {
		return userService.findAll();
	}

	@GetMapping("/users/page/{page}/{paramOrder}/{orden}")
	public Page<User> ListUsers(@PathVariable Integer page, @PathVariable String paramOrder,
			@PathVariable String orden) {
		return userService.findAll(page, paramOrder, orden);
	}
	
	@GetMapping("/users/{id}")
	public User getUser(@PathVariable Long id) {
		return userService.findById(id);
	}
	
	@GetMapping("/users/filterbydasid/{dasId}")
	public User filterByDasId(@PathVariable String dasId) {
		return userService.findByDasId(dasId);
	}

	@GetMapping("/users/dasvalid/{dasId}")
	public boolean dasValid(@PathVariable String dasId) {
		return userService.validDas(dasId);
	}

	@GetMapping("/users/filterbynested/page/{page}/{dasId}/{name}/{lastname1}/{lastname2}/{paramOrder}/{ordenado}")
	public Page<User> filterNested(@PathVariable int page, @PathVariable String dasId, @PathVariable String name,
			@PathVariable String lastname1, @PathVariable String lastname2, @PathVariable String paramOrder, @PathVariable String ordenado ) {
		return userService.filterNestedPage(dasId, name, lastname1, lastname2, page, paramOrder, ordenado);
	}

	@PostMapping("/users")
	public User saveUser(@Valid @RequestBody User user) {
		return userService.saveUser(user);
	}

	@PostMapping("/usersList")
	public void saveUser(@RequestBody List<User> users) {
		userService.saveListUser(users);
	}

	@PutMapping("/users/{id}")
	public User updateUser(@Valid @RequestBody User user) {
		return userService.updateUser(user);

	}

	@DeleteMapping("/users/{id}")
	public void deleteUser(@PathVariable Long id) {
		userService.deleteUserById(id);
	}

}
