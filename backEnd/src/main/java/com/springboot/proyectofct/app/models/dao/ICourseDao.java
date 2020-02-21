package com.springboot.proyectofct.app.models.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.springboot.proyectofct.app.models.entity.Course;

public interface ICourseDao extends JpaRepository<Course, Long> {

	@Query("select c from Course c where c.nameCourse like %?1%")
	public List<Course> filterByName(String nameCourse);
	
	public Page<Course> findAll(Pageable pageable);

	@Query("select c from Course c where c.nameCourse like ?1 and c.duration >= ?2 and c.duration <= ?3 and c.topic like ?4 and c.level like ?5")
	public List<Course> findNested(String nameCourse, Integer durationMin, Integer durationMax, String topic, String level);
	
	@Query("select c from Course c where c.nameCourse like ?1 and c.duration >= ?2 and c.duration <= ?3 and c.topic like ?4 and c.level like ?5")
	public Page<Course> findNestedPage(String nameCourse, Integer durationMin, Integer durationMax, String topic, String level, Pageable pageable);
}