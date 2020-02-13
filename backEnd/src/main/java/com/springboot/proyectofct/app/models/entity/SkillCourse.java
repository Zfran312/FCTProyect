package com.springboot.proyectofct.app.models.entity;
import java.io.Serializable; 

import javax.persistence.Entity; 
import javax.persistence.FetchType; 
import javax.persistence.Id; 
import javax.persistence.JoinColumn; 
import javax.persistence.ManyToOne; 
import javax.persistence.Table; 
 
@Entity 
@Table(name = "tb_skills_courses") 
public class SkillCourse implements Serializable{ 
 
	@Id 
	@ManyToOne(fetch = FetchType.LAZY) 
	@JoinColumn(name = "id_course") 
	private Course course; 
	 
	@Id 
	@ManyToOne(fetch = FetchType.LAZY) 
	@JoinColumn(name = "id_skill") 
	private Skill skill; 
 
	/** 
	 * @return the course 
	 */ 
	public Course getCourse() { 
		return course; 
	} 
 
	/** 
	 * @param course the course to set 
	 */ 
	public void setCourse(Course course) { 
		this.course = course; 
	} 
 
	/** 
	 * @return the skill 
	 */ 
	public Skill getSkill() { 
		return skill; 
	} 
 
	/** 
	 * @param skill the skill to set 
	 */ 
	public void setSkill(Skill skill) { 
		this.skill = skill; 
	}
	
	/** 
	 *  
	 */ 
	private static final long serialVersionUID = 1L; 
} 
