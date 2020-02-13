package com.springboot.proyectofct.app.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.springboot.proyectofct.app.models.entity.Role;
 
public interface IRoleDao extends CrudRepository<Role, Long> {
	
	
	Role findByName(String name);
	
	@Query("SELECT r FROM Role r WHERE r.name like %?1%")
	List<Role> filterByName(String name);
}

