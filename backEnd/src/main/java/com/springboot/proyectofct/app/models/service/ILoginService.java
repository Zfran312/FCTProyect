package com.springboot.proyectofct.app.models.service;

import java.sql.SQLException;
import java.util.List;

import javax.validation.Valid;

import com.springboot.proyectofct.app.models.entity.Login;

public interface ILoginService {

	public List<Login> findAll();
	
	public Login findByDasId(String dasId);
	
	public Login saveLogin(Login login);
	
	public Login updateLogin(Login login);
	
	public Boolean checkLogin(Login login) throws SQLException;
	
	public void deleteLoginById(Long id);
	
	public Login addAttempt(Login login) throws SQLException;

	public void resetAttempts(Login login) throws SQLException;

	public @Valid Login checkStatus(Login login) throws SQLException;
	
}