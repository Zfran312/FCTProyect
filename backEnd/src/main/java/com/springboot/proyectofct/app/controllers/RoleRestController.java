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

import com.springboot.proyectofct.app.models.entity.Role;
import com.springboot.proyectofct.app.models.service.IRoleService; 

@CrossOrigin(origins = "http://localhost:4200") 
@RequestMapping("/api") 
@RestController 
public class RoleRestController { 
 
	@Autowired 
	private IRoleService service; 
 
	@GetMapping("/roles") 
	public List<Role> listAll() { 
		return service.listAll(); 
	} 
 
	@GetMapping("/roles/{id}") 
	public Role get(@PathVariable Long id) { 
		return service.findById(id); 
	} 
 
	@DeleteMapping("/roles/{id}") 
	public void deleteById(@PathVariable Long id) { 
		service.deleteById(id); 
	} 
 
	@PostMapping("/roles") 
	public Role save(@Valid @RequestBody Role role) { 
		return service.save(role); 
	} 
	 
	@PutMapping("/roles") 
	public Role update(@Valid @RequestBody Role role) { 
		return service.save(role); 
	} 
} 