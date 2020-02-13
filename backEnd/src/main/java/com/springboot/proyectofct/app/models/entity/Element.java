package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;

import javax.persistence.Column; 
import javax.persistence.Entity; 
import javax.persistence.GeneratedValue; 
import javax.persistence.GenerationType; 
import javax.persistence.Id; 
import javax.persistence.Table; 
 
@Entity 
@Table(name = "tb_elements") 
public class Element implements Serializable { 
  
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "id_element") 
	private Long idElement; 
 
	@Column(name = "identifier", unique = true) 
	private String identifier; 
 
	@Column(name = "name_element") 
	private String name; 
 
	/** 
	 * @return the idElement 
	 */ 
	public Long getIdElement() { 
		return idElement; 
	} 
 
	/** 
	 * @param idElement the idElement to set 
	 */ 
	public void setIdElement(Long idElement) { 
		this.idElement = idElement; 
	} 
 
	/** 
	 * @return the identifier 
	 */ 
	public String getIdentifier() { 
		return identifier; 
	} 
 
	/** 
	 * @param identifier the identifier to set 
	 */ 
	public void setIdentifier(String identifier) { 
		this.identifier = identifier; 
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
