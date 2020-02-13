package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;

import javax.persistence.Column; 
import javax.persistence.Entity; 
import javax.persistence.GeneratedValue; 
import javax.persistence.GenerationType; 
import javax.persistence.Id; 
import javax.persistence.Table; 
 
@Entity 
@Table(name = "tb_skills") 
public class Skill implements Serializable{ 
 
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "id_skill") 
	private Long idSkill; 
 
	@Column(name = "name_skill") 
	private String name; 
 
	/** 
	 * @return the idSkill 
	 */ 
	public Long getIdSkill() { 
		return idSkill; 
	} 
 
	/** 
	 * @param idSkill the idSkill to set 
	 */ 
	public void setIdSkill(Long idSkill) { 
		this.idSkill = idSkill; 
	} 
 
	/** 
	 * @return the name 
	 */ 
	public String getName() { 
		return name; 
	} 
 
	/** 
	 * @param name the name to set 
	 */ 
	public void setName(String name) { 
		this.name = name; 
	} 
	 
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;	 
} 
