package com.springboot.proyectofct.app.models.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.springboot.proyectofct.app.models.entity.User;


public interface IUserDao extends CrudRepository<User, Long> {

	@Query("select u from User u where u.dasId=?1")
	public User findByDasId(String dasId);
}
