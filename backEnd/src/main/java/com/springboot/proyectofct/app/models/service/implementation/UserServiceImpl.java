package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.IUserDao;
import com.springboot.proyectofct.app.models.entity.User;
import com.springboot.proyectofct.app.models.service.IUserService;

@Service
public class UserServiceImpl implements IUserService{
	
	@Autowired
	private IUserDao userDao;

	@Autowired
	private JavaMailSender emailSender;
	
	@Override
	@Transactional(readOnly = true)
	public List<User> findAll() {
		return (List<User>) userDao.findAll();
	}
	
	@Override
	@Transactional(readOnly = true)
	public Page<User> findAll(int page,String paramOrder, String orden) {
		Pageable pageable;
		if(orden.equalsIgnoreCase("desc")) {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.DESC, paramOrder));
		}else {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.ASC, paramOrder));
		}
		return userDao.findAll(pageable);
	}


	@Override
	@Transactional(readOnly = true)
	public User findById(Long id) {
		return userDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public User saveUser(User user) {
		User newUser = userDao.save(user);
		String changePassRoute = "http://localhost:4200/changePassword/" + String.valueOf(newUser.getIdUser()) + "/" + user.getDasId();
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("udemylito@proyecto.atos");
		message.setCc("Xabi@jefe.atos");
		message.setTo(user.getEmail());
		message.setSubject("Contraseña de inicio de sesión");
		message.setText(
				"¡Hola!\nGracias por crear la cuenta, a continuación le proporcionamos un link para que establezca su contraseña:\n"
						+ changePassRoute);
		emailSender.send(message);
		return newUser;
	}
	
	@Override
	public User updateUser(User user) {
		return userDao.save(user);
	}

	@Override
	@Transactional
	public void deleteUserById(Long id) {
		Optional<User> userDelete = userDao.findById(id);
		userDelete.get().setDeleted(true);
		userDao.save(userDelete.get());
		//Queda aqui por si queremos volver al borrado fisico
		//userDao.deleteById(id);
	}

	@Override
	public List<User> filterByDasId(String dasId) {
		return userDao.findByNameUser(dasId);
	}

	@Override
	public User findByDasId(String dasId) {
		return (User) userDao.findByDasValid(dasId);
	}

	@Override
	public boolean validDas(String dasId) {
		if(userDao.findByDasValid(dasId)!=null) {
			return true;
		}else {
			return false;
		}
	}
	
	@Override
	public Page<User> filterNestedPage( String dasId, String name, String lastname1, String lastname2, int page, String paramOrder, String ordenado) {
		if(dasId.equalsIgnoreCase("null")) {dasId = "%";}else {dasId ="%" + dasId + "%";}
		if(name.equalsIgnoreCase("null")) {name = "%";}else {name ="%" + name + "%";}
		if(lastname1.equalsIgnoreCase("null")) {lastname1 = "%";}else {lastname1 ="%" + lastname1 + "%";}
		if(lastname2.equalsIgnoreCase("null")) {lastname2 = "%";}else {lastname2 ="%" + lastname2 + "%";}
		/*Pageable pageable = PageRequest.of(page, 4);*/
		Pageable pageable;
		if(ordenado.equalsIgnoreCase("desc")) {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.DESC, paramOrder));
		}else {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.ASC, paramOrder));
		}
		
		return userDao.findNestedPage(dasId, name, lastname1, lastname2, pageable);
	}

	@Override
	public void saveListUser(List<User> users) {
		for (User u : users) {
			userDao.save(u);
		}
	}
}
