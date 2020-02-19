package com.springboot.proyectofct.app.models.service.implementation;

import java.sql.SQLException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.proyectofct.app.models.dao.ILoginDao;
import com.springboot.proyectofct.app.models.entity.Login;
import com.springboot.proyectofct.app.models.service.ILoginService;

@Service
public class LoginServiceImpl implements ILoginService {

	@Override
	public List<Login> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Login findByDasId(String dasId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Login saveLogin(Login login) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Login updateLogin(Login login) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean checkLogin(Login login) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteLoginById(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Login addAttempt(Login login) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void resetAttempts(Login login) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public @Valid Login checkStatus(Login login) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	
}
