package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.proyectofct.app.models.dao.ISkillDao;
import com.springboot.proyectofct.app.models.entity.Skill;
import com.springboot.proyectofct.app.models.service.ISkillService;

@Service
public class SkillServiceImpl implements ISkillService {
	
	@Autowired
	private ISkillDao iSkillDao;
	
	@Override
	public List<Skill> findAll() {
		// TODO Auto-generated method stub
		return (List<Skill>)iSkillDao.findAll();
	}

	

}
