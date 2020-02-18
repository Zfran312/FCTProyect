package com.springboot.proyectofct.app.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.proyectofct.app.models.entity.Course;
import com.springboot.proyectofct.app.models.service.ICourseService;

@CrossOrigin(origins = "http://localhost:4200") 
@RequestMapping("/api")
@RestController
public class CourseRestController {

	@Autowired
	private ICourseService courseService;

	@GetMapping("/courses/page/{page}/{paramOrder}/{orden}")
	public Page<Course> ListCourse(@PathVariable Integer page, @PathVariable String paramOrder, @PathVariable String orden) {
		return courseService.findAll(page, paramOrder, orden);
	}

	@GetMapping("/courses/{id}")
	public Course getCourse(@PathVariable Long id) {
		return courseService.findById(id);
	}
	
	@GetMapping("/courses/filterbynested/page/{page}/{nameC}/{min}/{max}/{tematica}/{level}/{paramOrder}/{ordenado}")
	public Page<Course> filterByNestedPage(@PathVariable int page ,@PathVariable String nameC, @PathVariable Integer min, @PathVariable Integer max,
			@PathVariable String tematica, @PathVariable String level, @PathVariable String paramOrder, @PathVariable String ordenado) {
		return courseService.filterNestedPage(nameC, min, max, tematica, level, page, paramOrder, ordenado);
	}
	
	@PostMapping("/courses")
	public Course saveCourse(@Valid @RequestBody Course course) {
		return courseService.save(course);
	}

	@PutMapping("/courses/{id}")
	public Course updateCourse(@Valid @RequestBody Course course) {
		return courseService.save(course);
	}

	@DeleteMapping("/courses/{id}/{route}")
	public void deleteCourse(@PathVariable Long id,@PathVariable String route) {
		courseService.deleteById(id, route);
	}
	
}
