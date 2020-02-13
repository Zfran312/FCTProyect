package com.springboot.proyectofct.app.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.springboot.proyectofct.app.models.entity.Skill;

public interface ISkillDao extends CrudRepository<Skill, Long> { 
	 
} 