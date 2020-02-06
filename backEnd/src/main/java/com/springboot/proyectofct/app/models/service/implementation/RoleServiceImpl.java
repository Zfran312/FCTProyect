package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.IRoleDao;
import com.springboot.proyectofct.app.models.entity.Role;
import com.springboot.proyectofct.app.models.service.IRoleService;

@Service
public class RoleServiceImpl implements IRoleService {

	@Autowired 
	private IRoleDao roleDao; 
	 
	@Override 
	@Transactional(readOnly = true) 
	public List<Role> listAll() { 
		return (List<Role>) roleDao.findAll(); 
	} 
 
	@Override 
	@Transactional(readOnly = true) 
	public Role findById(Long id) { 
		return roleDao.findById(id).orElse(null); 
	} 
	
	@Override 
	@Transactional 
	public void deleteById(Long id) { 
		roleDao.deleteById(id); 
 
	} 
 
	@Override 
	@Transactional 
	public Role save(Role role) { 
		return roleDao.save(role); 
	} 
}
