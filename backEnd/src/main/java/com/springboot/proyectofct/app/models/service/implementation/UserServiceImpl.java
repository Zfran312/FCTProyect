package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.IUserDao;
import com.springboot.proyectofct.app.models.entity.User;
import com.springboot.proyectofct.app.models.service.IUserService;

public class UserServiceImpl implements IUserService{

	@Autowired
	private IUserDao userDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<User> findAll() {
		return (List<User>) userDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public User findById(Long id) {
		return userDao.findById(id).orElse(null);
	}

}
