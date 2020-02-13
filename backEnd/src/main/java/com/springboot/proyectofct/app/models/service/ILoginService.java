package com.springboot.proyectofct.app.models.service;

import java.util.List;

import com.springboot.proyectofct.app.models.entity.Login;


public interface ILoginService {

	public List<Login> findAll();
	
	public Login findByDasId(String dasId);
	
	public Login saveLogin(Login login);
	
	public void deleteLoginById(Long id);
	
}
