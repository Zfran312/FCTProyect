package com.springboot.proyectofct.app.models.service.implementation;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.IRoleDao;
import com.springboot.proyectofct.app.models.entity.Role;
import com.springboot.proyectofct.app.models.entity.User;
import com.springboot.proyectofct.app.models.service.IRoleService;

@Service
public class RoleServiceImpl implements IRoleService {

	@Override
	public List<Role> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Role findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteById(Long id) throws SQLException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Role save(Role role, Boolean estado) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Role> filterByName(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Role> filterByNamePage(String name, int page, String paramOrder, String orden) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Role> findAll(int page, String paramOrder, String orden) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Optional<User>> findListUsersRole(Long id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Long> findUserByRole(Long id) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	}
