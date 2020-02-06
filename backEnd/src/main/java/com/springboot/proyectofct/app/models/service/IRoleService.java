package com.springboot.proyectofct.app.models.service;

import java.util.List;

import com.springboot.proyectofct.app.models.entity.Role;

public interface IRoleService { 
	/** 
	 * List all roles 
	 *  
	 * @return a list with role objects 
	 */ 
	public List<Role> listAll(); 
 
	/** 
	 * find a role by id 
	 *  
	 * @param id 
	 * @return a role object if exists, else null 
	 */ 
	public Role findById(Long id); 
	 
	/** 
	 * Delete a role by id 
	 *  
	 * @param id 
	 */ 
	public void deleteById(Long id); 
 
	/** 
	 * save a role 
	 *  
	 * @param role , Class instance of Role 
	 * @return 
	 */ 
	public Role save(Role role); 
} 
