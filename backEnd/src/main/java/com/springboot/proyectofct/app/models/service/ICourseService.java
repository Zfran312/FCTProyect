package com.springboot.proyectofct.app.models.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springboot.proyectofct.app.models.entity.Course;

public interface ICourseService {

	public List<Course> findAll();
	
	public Page<Course> findAll(Pageable pageable);

	public void save(Course course);

	public Course findOne(Long idCourse);

	public void delete(Long idCourse);
	
}
