package com.springboot.proyectofct.app.models.service;

import java.util.List;
import org.springframework.data.domain.Page;

import com.springboot.proyectofct.app.models.entity.User;

public interface IUserService {

	public List<User> findAll();

	public User findById(Long id);
	
	public User findByDasId(String dasId);

	public User saveUser(User user);
	
	public User updateUser(User user);
	
	public void saveListUser(List<User> user);

	public void deleteUserById(Long id);
	
	public List<User> filterByDasId(String dasId);
	
	public boolean validDas(String dasId);
	
	public Page<User> findAll(int page, String paramOrder, String orden);
	
	public Page<User> filterNestedPage( String dasId, String name, String lastname1, String lastname2, int page, String paramOrder, String ordenado);
}
