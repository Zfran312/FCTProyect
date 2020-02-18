package com.springboot.proyectofct.app.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.springboot.proyectofct.app.models.entity.Skill;
import com.springboot.proyectofct.app.models.service.ICourseService;
import com.springboot.proyectofct.app.models.service.ISkillService;



@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@RestController
public class CourseController {
	
		@Autowired
		private ICourseService courseService;
		
		@Autowired
		private ISkillService iSkillService;
		
		@GetMapping("/course/listar")
		public List<Course> ListCourses() {
			return courseService.findAll();
		}
		
		@GetMapping("/courses/{id}")
		public Course getCourse(@PathVariable Long id) {
			return courseService.findById(id);
		}
		
		@PostMapping("/courses")
		public Course saveCourse(@Valid @RequestBody Course course) {
			return courseService.save(course);
		}
		
		@PutMapping("/courses/{id}")
		public Course updateCourse(@Valid @RequestBody Course course) {	
			return courseService.save(course);
		}
		
		@DeleteMapping("/courses/{id}")
		public void deleteCourse(@PathVariable Long id) {
			 courseService.deleteById(id);
		}
		
		@GetMapping("/skills")
		public List<Skill> recuperarSkill() {
			return iSkillService.findAll();
		}
		
		@PostMapping("/skills")
		public List<Skill> recibirSkill(@Valid @RequestBody List<Skill> list ) {
			/*System.out.println("HOLA MUNDO =>"+list.get(list.size()).getName());
			list_id = new ArrayList<Long>();
			for(int i = 0; i< list.size()-1; i++) {
				
				list_id.add(list.get(i).getIdSkill());
			}*/
			
			return list;
		}
}
