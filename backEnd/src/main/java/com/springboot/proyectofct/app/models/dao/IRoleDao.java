package com.springboot.proyectofct.app.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.springboot.proyectofct.app.models.entity.Role;
 
public interface IRoleDao extends CrudRepository<Role, Long> {
}

