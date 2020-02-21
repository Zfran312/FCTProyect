package com.springboot.proyectofct.app.models.dao;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.springboot.proyectofct.app.models.entity.Element;
import com.springboot.proyectofct.app.models.entity.Permission;
import com.springboot.proyectofct.app.models.entity.Permission.PermissionsPk;
import com.springboot.proyectofct.app.models.entity.Role;

public interface IPermissionDao extends CrudRepository<Permission, PermissionsPk>{

	@Query("SELECT p FROM Permission p WHERE p.id.role=?1 OR p.id.element=?2")
	public List<Permission> findAllByAnyId(Role role, Element element);
	
	@Query("SELECT p FROM Permission p WHERE p.id.role=?1")
	public List<Permission> findAllByRole(Role role);
	
	@Query("SELECT p FROM Permission p WHERE p.id=?1")
	public Permission findByTheId(PermissionsPk id);
}
