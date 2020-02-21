package com.springboot.proyectofct.app.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.springboot.proyectofct.app.models.entity.Element;

public interface IElementDao extends CrudRepository<Element, Long> {

	@Query("SELECT e FROM Element e WHERE e.identifier LIKE %?1%")
	public List<Element> findLikeScreen(String screen);
}
