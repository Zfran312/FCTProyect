package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.proyectofct.app.models.dao.ILoginDao;
import com.springboot.proyectofct.app.models.entity.Login;
import com.springboot.proyectofct.app.models.service.ILoginService;

@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private ILoginDao loginDao;
	
	@Override
	public List<Login> findAll() {
		
		return (List<Login>) loginDao.findAll();
	}

	@Override
	public Login findByDasId(String dasId) {
		
		return loginDao.findByDasId(dasId);
	}

	@Override
	public Login saveLogin(Login login) {
		
		return loginDao.save(login);
	}

	@Override
	public void deleteLoginById(Long id) {
		
		loginDao.deleteById(id);
		
	}

}
