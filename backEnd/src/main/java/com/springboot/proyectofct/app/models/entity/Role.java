package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable; 

import javax.persistence.Column; 
import javax.persistence.Entity; 
import javax.persistence.GeneratedValue; 
import javax.persistence.GenerationType; 
import javax.persistence.Id; 
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull; 
 
@Entity
@Table(name = "tb_roles")
public class Role implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Role primary key
	 */
	@Id
	@Column(name = "id_role")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idRole;

	/**
	 * Main name of the role
	 */
	@NotNull
	@Column(name = "name_role", length = 15)
	private String name;

	/**
	 * Brief description of the role
	 */
	@NotEmpty
	@Column(name = "desc_role", length = 40)
	private String description;

	/**
	 * @return the idRole
	 */
	public Long getIdRole() {
		return idRole;
	}

	/**
	 * @param idRole the idRole to set
	 */
	public void setIdRole(Long idRole) {
		this.idRole = idRole;
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
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

}
