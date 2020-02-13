package com.springboot.proyectofct.app.models.entity; 

import java.io.Serializable; 
import java.util.List; 
 
import javax.persistence.CascadeType; 
import javax.persistence.Column; 
import javax.persistence.Entity; 
import javax.persistence.FetchType; 
import javax.persistence.GeneratedValue; 
import javax.persistence.GenerationType; 
import javax.persistence.Id; 
import javax.persistence.OneToMany; 
import javax.persistence.Table; 
import javax.validation.constraints.NotNull; 
 
/** 
 *  
 * @author a759460 
 * 
 *			References the elements of the user interface 
 */ 
@Entity 
@Table(name = "tb_elements") 
public class Element implements Serializable { 
 
	/** 
	 *  
	 */ 
	private static final long serialVersionUID = 1L; 
 
	/** 
	 * Id primary key 
	 */ 
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@Column(name = "id_element") 
	private Integer idElement; 
	 
	/** 
	 * Identifier of the element 
	 */ 
	@NotNull 
	@Column(name = "identifier", unique = true) 
	private String identifier; 
	 
	/** 
	 * Name of the element 
	 */ 
	@NotNull 
	@Column(name = "name_element") 
	private String nameElement; 
	 
	/** 
	 * Permissions per element 
	 */ 
	@NotNull 
	@OneToMany(fetch=FetchType.LAZY, cascade = CascadeType.ALL) 
	private List<Permission> permissions; 
 
	/** 
	 * @return idElement 
	 */ 
	public Integer getIdElement() { 
		return idElement; 
	} 
 
	/** 
	 * Set idElement to the param value 
	 * @param idElement 
	 */ 
	public void setIdElement(Integer idElement) { 
		this.idElement = idElement; 
	} 
 
	 
	/** 
	 * @return identifier 
	 */ 
	public String getIdentifier() { 
		return identifier; 
	} 
 
	/** 
	 * Set identifier to the param value 
	 * @param identifier 
	 */ 
	public void setIdentifier(String identifier) { 
		this.identifier = identifier; 
	} 
 
	 
	/** 
	 * @return nameElement 
	 */ 
	public String getNameElement() { 
		return nameElement; 
	} 
 
	/** 
	 * Set nameElement to the param value 
	 * @param nameElement 
	 */ 
	public void setNameElement(String nameElement) { 
		this.nameElement = nameElement; 
	} 
 
	 
	/** 
	 * @return permissions 
	 */ 
	public List<Permission> getPermissions() { 
		return permissions; 
	} 
 
	/** 
	 * Set permissions to the param value 
	 * @param permissions 
	 */ 
	public void setPermissions(List<Permission> permissions) { 
		this.permissions = permissions; 
	} 
 
	 
}