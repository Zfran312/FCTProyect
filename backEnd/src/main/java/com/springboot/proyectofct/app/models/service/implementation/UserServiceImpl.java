package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.IUserDao;
import com.springboot.proyectofct.app.models.entity.User;
import com.springboot.proyectofct.app.models.service.IUserService;

@Service
public class UserServiceImpl implements IUserService{

	@Override
	public List<User> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User findByDasId(String dasId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User saveUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User updateUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void saveListUser(List<User> user) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteUserById(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<User> filterByDasId(String dasId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean validDas(String dasId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Page<User> findAll(int page, String paramOrder, String orden) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<User> filterNestedPage(String dasId, String name, String lastname1, String lastname2, int page,
			String paramOrder, String ordenado) {
		// TODO Auto-generated method stub
		return null;
	}

	
}