package com.springboot.proyectofct.app.controllers;

import java.util.List;

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

import com.springboot.proyectofct.app.models.entity.Skill;
import com.springboot.proyectofct.app.models.service.ISkillService;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
@RestController
public class SkillRestController {

	@Autowired
	private ISkillService skillService;
	
	@GetMapping("/skills")
	public List<Skill> ListSkill() {
		return skillService.findAll();
	}
	
	@GetMapping("/skills/page/{page}/{paramOrder}/{orden}")
	public Page<Skill> ListSkill(@PathVariable Integer page, @PathVariable String paramOrder, @PathVariable String orden) {
		return skillService.findAll(page, paramOrder, orden);
	}

	@GetMapping("/skills/{id}")
	public Skill get(@PathVariable Long id) {
		return skillService.findById(id);
	}
	
	@GetMapping("/skills/filterbyskillname/page/{page}/{name}/{paramOrder}/{orden}")
	public Page<Skill> filterByNamePage(@PathVariable int page, @PathVariable String name, @PathVariable String paramOrder, @PathVariable String orden) {
		return skillService.filterByNamePage(page, name, paramOrder, orden);
	}

	@PostMapping("/skills")
	public Skill save(@Valid @RequestBody Skill skill) {
		return skillService.saveSkill(skill);
	}
	
	@PutMapping("/skills/{id}")
	public Skill update(@Valid @RequestBody Skill skill) {
		return skillService.saveSkill(skill);
	}	
	
	@DeleteMapping("/skills/{id}")
	public void deleteById(@PathVariable Long id) {
		skillService.deleteSkillById(id);
	}
} 