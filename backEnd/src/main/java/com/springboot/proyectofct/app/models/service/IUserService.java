package com.springboot.proyectofct.app.models.service;

import java.util.List;
import com.springboot.proyectofct.app.models.entity.User;

public interface IUserService {

	public List<User> findAll();
	
	public User findById(Long id);
	
}