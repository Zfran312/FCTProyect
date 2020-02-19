package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.springboot.proyectofct.app.models.dao.ISkillDao;
import com.springboot.proyectofct.app.models.entity.Skill;
import com.springboot.proyectofct.app.models.service.ISkillService;

@Service
public class SkillServiceImpl implements ISkillService {

	@Override
	public List<Skill> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Skill findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Skill saveSkill(Skill skill) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteSkillById(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Page<Skill> findAll(int page, String paramOrder, String orden) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Skill> filterByNamePage(int page, String name, String paramOrder, String orden) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	

}
