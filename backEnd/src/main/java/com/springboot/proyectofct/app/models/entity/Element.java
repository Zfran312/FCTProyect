package com.springboot.proyectofct.app.models.entity; 

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "tb_elements")
public class Element implements Serializable {

	/**
	 * Id primary key
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_element")
	private Long idElement;
	
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
	@JsonBackReference
	@OneToMany(mappedBy = "id.element")
	private Set<Permission> permissions;

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
	public Set<Permission> getPermissions() {
		return permissions;
	}

	/**
	 * Set permissions to the param value
	 * @param permissions
	 */
	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}

	private static final long serialVersionUID = 1L;	
}