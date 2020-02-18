package com.springboot.proyectofct.app.controllers;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

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

import com.springboot.proyectofct.app.models.entity.Role;
import com.springboot.proyectofct.app.models.service.IRoleService;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@RestController
public class RoleRestController {

	@Autowired
	private IRoleService service;
	
	private Boolean modificar = false;

	@GetMapping("/roles")
	public List<Role> ListRoles() {
		return service.findAll();
	}

	@GetMapping("/roles/page/{page}/{paramOrder}/{orden}")
	public Page<Role> ListRolesPage(@PathVariable Integer page, @PathVariable String paramOrder, @PathVariable String orden) {
		return service.findAll(page, paramOrder, orden);
	}

	@GetMapping("/roles/{id}")
	public Role get(@PathVariable Long id) {
		return service.findById(id);
	}
	
	@GetMapping("/roles/userslist/{id}")
	public List<Optional<User>> getListUsersRole(@PathVariable Long id) throws SQLException {
		return service.findListUsersRole(id);
	}
	
	@GetMapping("/roles/filterbyrolename/page/{page}/{name}/{paramOrder}/{orden}")
	public Page<Role> filterByName(@PathVariable int page, @PathVariable String name , @PathVariable String paramOrder, @PathVariable String orden) {
		return service.filterByNamePage(name, page, paramOrder, orden);
	}
	
	@GetMapping("/roles/usersbyrole/{id}")
	public List<Long> findUserByRole(@PathVariable Long id) throws SQLException {
		return service.findUserByRole(id);
	}

	@PostMapping("/roles")
	public Role save(@Valid @RequestBody Role role) throws SQLException {
		return service.save(role, modificar);		
	}
	
	@PutMapping("/roles/{id}")
	public Role update(@Valid @RequestBody Role role) throws SQLException {
		return service.save(role, modificar = true);
	}
	
	@DeleteMapping("/roles/{id}")
	public void deleteById(@PathVariable Long id) throws SQLException {
		service.deleteById(id);
	}
}
