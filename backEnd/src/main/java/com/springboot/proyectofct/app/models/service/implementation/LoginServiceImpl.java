package com.springboot.proyectofct.app.models.service.implementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.springboot.proyectofct.app.controllers.PermissionRestController;
import com.springboot.proyectofct.app.models.dao.ILoginDao;
import com.springboot.proyectofct.app.models.entity.Login;
import com.springboot.proyectofct.app.models.entity.User;
import com.springboot.proyectofct.app.models.service.ILoginService;
import com.springboot.proyectofct.app.models.service.IUserService;

@Service
public class LoginServiceImpl implements ILoginService {

	@Autowired
	private ILoginDao loginDao;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private ILoginService loginService;

	@Autowired
	private IUserService userservice;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	int attempts;

	Connection connection;

	@Override
	public List<Login> findAll() {

		return (List<Login>) loginDao.findAll();
	}

	@Override
	public Login findByDasId(String dasId) {

		return loginDao.findByUsername(dasId);
	}

	@Override
	public Login saveLogin(Login login) {
		String loginDas = login.getUsername();
		Long loginId = login.getIdLogin();

		User checkUser = userservice.findById(loginId);
		login.setIdLogin(null);
		login.setUser(checkUser);
		login.setPassword(passwordEncoder.encode(login.getPassword()));

		if (checkUser == null || !loginDas.equals(checkUser.getDasId()) || loginId != checkUser.getIdUser()) {
			login.setEnabled(false);
			return login;
		} else {
			Login newLogin = loginDao.save(login);
			checkUser.setStatus(1);
			this.userservice.updateUser(checkUser);
			return newLogin;
		}
	}

	@Override
	public void deleteLoginById(Long id) {

		loginDao.deleteById(id);

	}

	@Override
	public Login addAttempt(Login login) throws SQLException {
			connection = jdbcTemplate.getDataSource().getConnection();
			PreparedStatement preparedStatement = connection
					.prepareStatement("select tries from tb_login where das_id=?");

			preparedStatement.setNString(1, login.getUsername());

			ResultSet res = preparedStatement.executeQuery();

			if (res.next()) {
				attempts = res.getInt(1);
			}

			attempts++;

			login.setTries(attempts);

			PreparedStatement preparedStatement2 = connection
					.prepareStatement("update tb_login set tries=? where das_id=?");

			preparedStatement2.setInt(1, attempts);
			preparedStatement2.setNString(2, login.getUsername());
			preparedStatement2.executeUpdate();
			connection.close();

			if (attempts >= 3) {
				connection = jdbcTemplate.getDataSource().getConnection();
				PreparedStatement preparedStatement3 = connection
						.prepareStatement("update tb_users set user_status=3 where das_id=?");
				preparedStatement3.setNString(1, login.getUsername());
				preparedStatement3.executeUpdate();
				preparedStatement3 = connection.prepareStatement("update tb_login set enabled=0 where das_id=?");
				preparedStatement3.setNString(1, login.getUsername());
				preparedStatement3.executeUpdate();
				connection.close();
			}
		return login;
	}

	@Override
	public void resetAttempts(Login login) throws SQLException {
		connection = jdbcTemplate.getDataSource().getConnection();
		PreparedStatement preparedStatement = connection.prepareStatement("update tb_login set tries=0 where das_id=?");
		preparedStatement.setNString(1, login.getUsername());
		preparedStatement.executeUpdate();
		connection.close();
	}

	@Override
	public @Valid Login checkStatus(Login login) throws SQLException {
		connection = jdbcTemplate.getDataSource().getConnection();
		PreparedStatement preparedStatement = connection.prepareStatement("select tries from tb_login where das_id=?");
		preparedStatement.setNString(1, login.getUsername());
		ResultSet res = preparedStatement.executeQuery();
		if (res.next()) {
			login.setTries(res.getInt(1));
		}
		connection.close();
		return login;
	}

	@Override
	public Login updateLogin(Login login) {
		login.setPassword(passwordEncoder.encode(login.getPassword()));
		return loginDao.save(login);
	}

	@Override
	public Boolean checkLogin(Login login) throws SQLException {
		try {
			// Lanza excepción si falla la autentificación
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
		
			loginService.resetAttempts(login);
			PermissionRestController.setRoleList(userservice.findByDasId(login.getUsername()).getRoles());
			return true;
		} catch (BadCredentialsException ex) {
			// Se comenta por ahora por que no esta siendo capturado por el handler
			// ex.printStackTrace();
			System.out.println("BAD CREDENTIALS");
			return false;
		}
	}

}
