package com.springboot.proyectofct.app.models.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;

import com.springboot.proyectofct.app.models.entity.Role;
import com.springboot.proyectofct.app.models.entity.User;

public interface IRoleService {

	public List<Role> findAll();

	public Role findById(Long id);

	public void deleteById(Long id) throws SQLException;

	public Role save(Role role, Boolean estado) throws SQLException;

	public List<Role> filterByName(String name);
	
	public Page<Role> filterByNamePage(String name, int page, String paramOrder, String orden);
	
	public Page<Role> findAll(int page, String paramOrder, String orden);
	
	public List<Optional<User>> findListUsersRole(Long id) throws SQLException;
	
	public List<Long> findUserByRole(Long id) throws SQLException;
}
