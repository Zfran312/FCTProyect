package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.IElementDao;
import com.springboot.proyectofct.app.models.entity.Element;
import com.springboot.proyectofct.app.models.service.IElementService;

@Service
public class ElementServiceImpl implements IElementService {
	
	@Autowired
	private IElementDao elementDao;

	@Override
	@Transactional(readOnly = true)
	public List<Element> findAll() {
		return (List<Element>) elementDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Element> findLikeScreen(String screen) {
		return elementDao.findLikeScreen(screen);
	}

}
