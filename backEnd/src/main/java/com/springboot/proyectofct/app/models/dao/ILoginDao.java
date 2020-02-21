package com.springboot.proyectofct.app.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.springboot.proyectofct.app.models.entity.Login;

public interface ILoginDao extends CrudRepository<Login,Long>{

	public Login findByUsername(String username);
	
}





