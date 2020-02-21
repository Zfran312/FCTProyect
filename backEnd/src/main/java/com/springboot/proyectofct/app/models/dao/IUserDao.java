package com.springboot.proyectofct.app.models.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.proyectofct.app.models.entity.User;

public interface IUserDao extends JpaRepository<User, Long> {

	@Query("select u from User u where u.dasId like %?1% and u.deleted = false")
	public List<User> findByNameUser(String nameUser);
	
	@Query("select u from User u where u.dasId = ?1")
	public User findByDasValid(String Das);
	
	@Query("select u from User u where u.deleted = false")
	public Page<User> findAll(Pageable pageable);

	@Query("select u from User u where u.dasId like ?1 and u.nameUser like ?2 and u.lastname1 like ?3 and u.lastname2 like ?4 and u.deleted = false")
	public List<User> findNested(String dasId, String nameUser, String lastname1, String lastname2);
	
	@Query("select u from User u where u.dasId like ?1 and u.nameUser like ?2 and u.lastname1 like ?3 and u.lastname2 like ?4 and u.deleted = false")
	public Page<User> findNestedPage(String dasId, String nameUser, String lastname1, String lastname2, Pageable pageable);

}
