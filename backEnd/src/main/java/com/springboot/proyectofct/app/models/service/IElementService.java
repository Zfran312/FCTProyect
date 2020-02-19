package com.springboot.proyectofct.app.models.service;

import java.util.List;

import com.springboot.proyectofct.app.models.entity.Element;

public interface IElementService {

	public List<Element> findAll();
	
	public List<Element> findLikeScreen(String screen);
}
