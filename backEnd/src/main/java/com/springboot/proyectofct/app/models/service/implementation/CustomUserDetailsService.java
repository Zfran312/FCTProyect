package com.springboot.proyectofct.app.models.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.ILoginDao;
import com.springboot.proyectofct.app.models.entity.Login;
import com.springboot.proyectofct.app.models.entity.Role;

@Service("CustomUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private ILoginDao loginDao;

	private Logger log = LoggerFactory.getLogger(CustomUserDetailsService.class);

	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Login login = loginDao.findByUsername(username);
		
		if (login == null) {
			log.error("Error en el login, el usuario '" + username + "' no existe!!");
			throw new UsernameNotFoundException("El usuario" + username + " no existe!!");
		}

		com.springboot.proyectofct.app.models.entity.User user = login.getUser();

		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

		for (Role roles : user.getRoles()) {
			String role = roles.getName();

			authorities.add(new SimpleGrantedAuthority(role));
		}

		if (authorities.isEmpty()) {
			log.error("Error en el login, el usuario '" + username + "' no tiene ningun rol!!");
			throw new UsernameNotFoundException("Al usuario" + username + " no se le asignaron roles!!");
		}

		return new User(login.getUser().getDasId(), login.getPassword(), login.getEnabled(), true, true, true,
				authorities);
	}

}
