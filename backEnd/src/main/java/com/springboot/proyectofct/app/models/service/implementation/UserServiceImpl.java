package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.IUserDao;
import com.springboot.proyectofct.app.models.entity.User;
import com.springboot.proyectofct.app.models.service.IUserService;

@Service
public class UserServiceImpl implements IUserService{
	
	@Autowired
	private IUserDao userService;
	
	@Override
	@Transactional(readOnly = true)
	public List<User> findAll() {
		return (List<User>) userService.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public User findById(Long id) {
		return userService.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public User saveUser(User user) {
		return userService.save(user);	
	}

	@Override
	@Transactional
	public void deleteUserById(Long id) {
		userService.deleteById(id);
		
	}


}
