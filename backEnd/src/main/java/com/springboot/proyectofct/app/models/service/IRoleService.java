package com.springboot.proyectofct.app.models.service;

import java.util.List;

import com.springboot.proyectofct.app.models.entity.Role;

public interface IRoleService {
	
	public List<Role> listAll();

	public Role findById(Long id);

	public void deleteById(Long id);

	public Role save(Role role);
}
