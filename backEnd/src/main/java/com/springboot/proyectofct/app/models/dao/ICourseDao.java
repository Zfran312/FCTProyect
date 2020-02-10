package com.springboot.proyectofct.app.models.dao;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.springboot.proyectofct.app.models.entity.Course;

public interface ICourseDao extends PagingAndSortingRepository<Course, Long> {

}