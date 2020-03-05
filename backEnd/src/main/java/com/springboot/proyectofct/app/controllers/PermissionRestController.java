package com.springboot.proyectofct.app.controllers;

import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.proyectofct.app.models.entity.Element;
import com.springboot.proyectofct.app.models.entity.Permission;
import com.springboot.proyectofct.app.models.entity.Role;
import com.springboot.proyectofct.app.models.service.IElementService;
import com.springboot.proyectofct.app.models.service.IPermissionService;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/permissions")
@RestController
public class PermissionRestController {

	@Autowired
	private IPermissionService permissionService;
	
	@Autowired
	private IElementService elementService;
	
	private static Set<Role> roleList;
	
	@GetMapping("/permissionsUser/{screen}")
	public List<Permission> getElementsPermited(@PathVariable String screen){
		return permissionService.validPermission(screen, roleList);
	}
	
	@GetMapping("/elements")
	public List<Element> ListElements(){
		return elementService.findAll();
	}
	
	@PostMapping("/save/{idRole}")
	public List<Permission> savePermissions(@RequestBody List<Element> elements, @PathVariable Long idRole) {
		return permissionService.savePermission(elements, idRole);
	}
	
	@PostMapping("/role/{idRole}")
	public List<Permission> listByRole(@PathVariable Long idRole, @Valid @RequestBody Role role){
		return permissionService.findByRole(role);
	}
	
	@PutMapping("/permissions")
	public List<Permission> updatePermissions(@RequestBody List<Permission> permissions){
		return permissionService.saveAllPermissions(permissions);
	}

	public static void setRoleList(Set<Role> roleList) {
		PermissionRestController.roleList = roleList;
	}
}
