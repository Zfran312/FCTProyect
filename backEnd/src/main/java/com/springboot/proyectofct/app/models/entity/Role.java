package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "tb_roles")
public class Role implements Serializable {

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
	@Column(name = "name_role", length = 15, unique = true)
	private String name;

	/**
	 * Brief description of the role
	 */
	@NotEmpty
	@Column(name = "desc_role", length = 40)
	private String description;

	@JsonIgnore
	@OneToMany(mappedBy = "id.role")
	@Cascade(CascadeType.DELETE)
	private Set<Permission> permissions;
	
	// relacion usuarios con roles
	@JsonIgnore
	@ManyToMany(mappedBy = "roles")
	private List<User> user=new ArrayList<User>();
	
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

	public Set<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(Set<Permission> permissions) {
		this.permissions = permissions;
	}

	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}

	private static final long serialVersionUID = 1L;
}
