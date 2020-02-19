package com.springboot.proyectofct.app.models.service;

import java.util.List;
import java.util.Set;

import com.springboot.proyectofct.app.models.entity.Element;
import com.springboot.proyectofct.app.models.entity.Permission;
import com.springboot.proyectofct.app.models.entity.Permission.PermissionsPk;
import com.springboot.proyectofct.app.models.entity.Role;

public interface IPermissionService {

	public List<Permission> findAll();
	
	public List<Permission> findByAnyId(Permission permission);
	
	public List<Permission> savePermission(List<Element> elements, Long idRole);
	
	public List<Permission> saveAllPermissions(List<Permission> perm);
	
	public List<Permission> findByRole(Role role);
	
	public Permission findById(PermissionsPk id);
	
	public List<Permission> validPermission(String screen, Set<Role> roleList);
	
}
