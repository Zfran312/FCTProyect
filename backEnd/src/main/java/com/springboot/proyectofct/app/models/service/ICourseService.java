package com.springboot.proyectofct.app.models.service;

import java.io.File;
import org.springframework.data.domain.Page;

import com.springboot.proyectofct.app.models.entity.Course;

public interface ICourseService {
	
	public Page<Course> findAll(int page, String paramOrder, String orden);

	public Course save(Course course);

	public Course findById(Long idCourse);

	public void deleteById(Long id, String route);
	
	public File fileFtp(String file);
	
	public Page<Course> filterNestedPage(String nameCourse, Integer duration1, Integer duration2, String topic, String level, int page, String paramOrder, String orden);
	
}
