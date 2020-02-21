package com.springboot.proyectofct.app.models.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.proyectofct.app.models.entity.Skill;

public interface ISkillDao extends JpaRepository<Skill, Long> {

	@Query("Select s from Skill s where s.name like %?1%")
	List<Skill> findByName(String name);
	
	public Page<Skill> findAll(Pageable pageable);
	
	@Query("Select s from Skill s where s.name like %?1%")
	Page<Skill> findByNamePage(String name, Pageable pageable);
	
}
