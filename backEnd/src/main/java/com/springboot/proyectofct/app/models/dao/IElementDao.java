package com.springboot.proyectofct.app.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.springboot.proyectofct.app.models.entity.Element;

public interface IElementDao extends CrudRepository<Element, Long>{
	
	
}
