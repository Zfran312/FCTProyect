package com.springboot.proyectofct.app.models.service.implementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.IRoleDao;
import com.springboot.proyectofct.app.models.dao.IUserDao;
import com.springboot.proyectofct.app.models.entity.Element;
import com.springboot.proyectofct.app.models.entity.Permission;
import com.springboot.proyectofct.app.models.entity.Permission.PermissionsPk;
import com.springboot.proyectofct.app.models.entity.Role;
import com.springboot.proyectofct.app.models.entity.User;
import com.springboot.proyectofct.app.models.service.IElementService;
import com.springboot.proyectofct.app.models.service.IPermissionService;


@Service
public class RoleServiceImpl implements IRoleService {
	
	@Autowired
	private IElementService eleService;
	
	@Autowired
	private IPermissionService permService;
	
	@Autowired
	private IRoleDao roleDao;
	
	@Autowired
	private IUserDao userDao;

	Connection connection;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	@Transactional(readOnly = true)
	public Page<Role> findAll(int page, String paramOrder, String orden) {
		Pageable pageable;
		if (orden.equalsIgnoreCase("desc")) {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.DESC, paramOrder));
		} else {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.ASC, paramOrder));
		}
		return roleDao.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Role findById(Long id) {
		return roleDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public void deleteById(Long id) throws SQLException{
		roleDao.deleteById(id);
		this.DeleteRelationUsersRole(id);
	}

	@Override
	@Transactional
	public Role save(Role role, Boolean modificar) throws SQLException {
		if(!modificar) {
			Role r = roleDao.save(role);
			for (Element ele : eleService.findAll()) {
				PermissionsPk permPk = new PermissionsPk();
				permPk.setRole(r);
				permPk.setElement(ele);
				Permission perm = new Permission();
				perm.setId(permPk);
				perm.setPermited(false);
				List<Permission> prueba = new ArrayList<Permission>();
				prueba.add(perm);
				permService.saveAllPermissions(prueba);
			}
			return r;
		}else{
			this.DeleteRelationUsersRole(role.getIdRole());
			return roleDao.save(role);
		}
		
	}

	@Override
	public List<Role> filterByName(String name) {
		return roleDao.filterLikeName(name);
	}

	@Override
	public Page<Role> filterByNamePage(String name, int page, String paramOrder, String orden) {
		Pageable pageable;
		if (orden.equalsIgnoreCase("desc")) {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.DESC, paramOrder));
		} else {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.ASC, paramOrder));
		}
		return roleDao.filterLikeNamePage(name, pageable);
	}

	@Override
	public List<Role> findAll() {
		return (List<Role>) roleDao.findAll();
	}

	@Override
	public List<Optional<User>> findListUsersRole(Long id) throws SQLException {
		connection = jdbcTemplate.getDataSource().getConnection();
		PreparedStatement preparedStatement = connection
				.prepareStatement("select id_user from tb_authorities where id_role=?");
		preparedStatement.setLong(1, id);
		ResultSet res = preparedStatement.executeQuery();
		List<Long> listId = new ArrayList<Long>();
		List<Optional<User>> listUsersRole = new ArrayList<Optional<User>>();
		while (res.next()) {
			Long id_user = res.getLong("id_user");
			listId.add(id_user);
		}
		if(listId.size()>0) {
			for(int i =0; i<listId.size(); i++){
				Optional<User> user = userDao.findById(listId.get(i));
				listUsersRole.add(user);
			}
		}
		connection.close();
		return listUsersRole;
	}
	
	public void DeleteRelationUsersRole(Long id) throws SQLException {
		connection = jdbcTemplate.getDataSource().getConnection();
		PreparedStatement preparedStatement = connection
				.prepareStatement("delete from tb_authorities where id_role = ?");
		preparedStatement.setLong(1, id);
		preparedStatement.executeUpdate();
		connection.close();
	}

	@Override
	public List<Long> findUserByRole(Long id) throws SQLException{
		connection = jdbcTemplate.getDataSource().getConnection();
		PreparedStatement preparedStatement = connection
				.prepareStatement("select count(id_role) roles from udemylito.tb_authorities where id_user in" + 
								  "(select id_user from udemylito.tb_authorities where id_role = ?) group by id_user;");
		preparedStatement.setLong(1, id);
		ResultSet res = preparedStatement.executeQuery();
		List<Long> listId = new ArrayList<Long>();
		while (res.next()) {
			listId.add(res.getLong("roles"));
		}
		return listId;
	}

}
