package com.springboot.proyectofct.app.models.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springboot.proyectofct.app.models.entity.Course;

public interface ICourseService {

	public List<Course> findAll();
	
	public Page<Course> findAll(Pageable pageable);

	public Course save(Course course);

	public Course findById(Long idCourse);

	public void deleteById(Long idCourse);
	
}
