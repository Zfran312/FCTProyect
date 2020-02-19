package com.springboot.proyectofct.app.models.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.springboot.proyectofct.app.models.entity.Skill;

public interface ISkillService {
	
	public List<Skill> findAll();

	public Skill findById(Long id);

	public Skill saveSkill(Skill skill);

	public void deleteSkillById(Long id);

	Page<Skill> findAll(int page, String paramOrder, String orden);
	
	Page<Skill> filterByNamePage(int page, String name, String paramOrder, String orden);
	
}