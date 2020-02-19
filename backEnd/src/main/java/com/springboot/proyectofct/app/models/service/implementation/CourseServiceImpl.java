package com.springboot.proyectofct.app.models.service.implementation;

import java.io.File;
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

	@Override
	public Page<Course> findAll(int page, String paramOrder, String orden) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Course save(Course course) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Course findById(Long idCourse) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteById(Long id, String route) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public File fileFtp(String file) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Page<Course> filterNestedPage(String nameCourse, Integer duration1, Integer duration2, String topic,
			String level, int page, String paramOrder, String orden) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
