package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;

import javax.persistence.Entity; 
import javax.persistence.Id; 
import javax.persistence.JoinColumn; 
import javax.persistence.ManyToOne; 
import javax.persistence.Table; 
import javax.validation.constraints.NotNull; 

@Entity 
@Table(name = "tb_permissions") 
public class Permission implements Serializable { 
  
	/** 
	 * Id of the role 
	 */ 
	@Id 
	@ManyToOne(targetEntity = Role.class) 
	@JoinColumn(name = "id_role") 
	private Long idRole; 
	 
	/** 
	 * Id of the element 
	 */ 
	@Id 
	@ManyToOne(targetEntity = Element.class) 
	@JoinColumn(name = "id_element") 
	private Long idElement; 
	 
	/** 
	 * true if the element is pemited in the role 
	 */ 
	@NotNull 
	private Boolean	permited; 
 
	/** 
	 * @return idRole 
	 */ 
	public Long getIdRole() { 
		return idRole; 
	} 
 
	/** 
	 * Set idRole to the param value 
	 * @param idRole 
	 */ 
	public void setIdRole(Long idRole) { 
		this.idRole = idRole; 
	} 
	 
 
	/** 
	 * @return idElement 
	 */ 
	public Long getIdElement() { 
		return idElement; 
	} 
 
	/** 
	 * Set idElement to the param value 
	 * @param idElement 
	 */ 
	public void setIdElement(Long idElement) { 
		this.idElement = idElement; 
	} 
	 
 
	/** 
	 * @return permited 
	 */ 
	public Boolean isPermited() { 
		return permited; 
	} 
 
	/** 
	 * Set permited to the param value 
	 * @param permited 
	 */ 
	public void setPermited(boolean permited) { 
		this.permited = permited; 
	} 

	/** 
	 *  
	 */ 
	private static final long serialVersionUID = 1L; 
} 
