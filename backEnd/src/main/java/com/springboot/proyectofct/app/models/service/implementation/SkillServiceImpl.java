package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.ISkillDao;
import com.springboot.proyectofct.app.models.entity.Skill;
import com.springboot.proyectofct.app.models.service.ISkillService;


@Service
public class SkillServiceImpl implements ISkillService{

	@Autowired
	private ISkillDao skillDao;
	
	@Override
	@Transactional(readOnly = true)
	public Page<Skill> findAll(int page,String paramOrder, String orden) {
		Pageable pageable;
		if(orden.equalsIgnoreCase("desc")) {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.DESC, paramOrder));
		}else {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.ASC, paramOrder));
		}
		return skillDao.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Skill findById(Long id) {
		return skillDao.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Skill saveSkill(Skill skill) {
		return skillDao.save(skill);
	}

	@Override
	@Transactional
	public void deleteSkillById(Long id) {
		skillDao.deleteById(id);
	}
	
	@Override
	public Page<Skill> filterByNamePage(int page, String name, String paramOrder, String orden) {
		Pageable pageable;
		if(orden.equalsIgnoreCase("desc")) {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.DESC, paramOrder));
		}else {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.ASC, paramOrder));
		}
		return skillDao.findByNamePage(name, pageable);
	}

	@Override
	public List<Skill> findAll() {
		return (List<Skill>) skillDao.findAll();
	}
}