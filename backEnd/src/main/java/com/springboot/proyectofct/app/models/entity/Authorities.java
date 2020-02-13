package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable; 

import javax.persistence.Entity; 
import javax.persistence.Id; 
import javax.persistence.JoinColumn; 
import javax.persistence.ManyToOne; 
import javax.persistence.Table; 

@Entity 
@Table(name = "tb_authorities") 
public class Authorities implements Serializable { 
  
	@Id 
	@ManyToOne 
	@JoinColumn(name = "id_user") 
	private User user; 
 
	@Id 
	@ManyToOne 
	@JoinColumn(name = "id_role") 
	private Role role; 
 
	/** 
	 * @return the user 
	 */ 
	public User getUser() { 
		return user; 
	} 
 
	/** 
	 * @param user the user to set 
	 */ 
	public void setUser(User user) { 
		this.user = user; 
	} 
 
	/** 
	 * @return the role 
	 */ 
	public Role getRole() { 
		return role; 
	} 
 
	/** 
	 * @param role the role to set 
	 */ 
	public void setRole(Role role) { 
		this.role = role; 
	} 

	/** 
	 *  
	 */ 
	private static final long serialVersionUID = 1L; 
} 
