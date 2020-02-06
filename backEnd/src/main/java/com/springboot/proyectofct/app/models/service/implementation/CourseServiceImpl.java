package com.springboot.proyectofct.app.models.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.ICourseDao;
import com.springboot.proyectofct.app.models.entity.Course;
import com.springboot.proyectofct.app.models.service.ICourseService;

@Service
public class CourseServiceImpl implements ICourseService{

	@Autowired
	private ICourseDao courseDao;
	
	@Override
	@Transactional(readOnly = true)
	public List<Course> findAll() {
		// TODO Auto-generated method stub
		return (List<Course>) courseDao.findAll();
	}

	@Override
	public Page<Course> findAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return courseDao.findAll(pageable);
	}

	@Override
	public Course save(Course course) {
		// TODO Auto-generated method stub
		return courseDao.save(course);
	}

	@Override
	@Transactional(readOnly = true)
	public Course findById(Long idCourse) {
		// TODO Auto-generated method stub
		return courseDao.findById(idCourse).orElse(null);
	}

	@Override
	@Transactional
	public void deleteById(Long idCourse) {
		// TODO Auto-generated method stub
		courseDao.deleteById(idCourse);
	}

}
