package com.springboot.proyectofct.app.models.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.proyectofct.app.models.entity.Role;

public interface IRoleDao extends JpaRepository<Role, Long> {
		
	@Query("SELECT r FROM Role r WHERE r.name like %?1%")
	List<Role> filterLikeName(String name);
	
	public Page<Role> findAll(Pageable pageable);
	
	@Query("SELECT r FROM Role r WHERE r.name like %?1%")
	Page<Role> filterLikeNamePage(String name, Pageable pageable);

}
