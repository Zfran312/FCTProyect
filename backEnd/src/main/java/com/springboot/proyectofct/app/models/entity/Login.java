package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.springboot.proyectofct.app.models.service.implementation.UserServiceImpl;

@Entity
@Table(name = "tb_login")
public class Login implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_login")
	private long id;

	@NotNull
	@Column(name = "das_id")
	private String dasId;

	private String password;

	private int tries;

	private boolean enabled;

	public List<Role> getUserRole() {
		User user = new UserServiceImpl().findByDasId(dasId);
		return user.getRole();
	}

	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}

	/**
	 * @return the dasId
	 */
	public String getDasId() {
		return dasId;
	}

	/**
	 * @param dasId the dasId to set
	 */
	public void setDasId(String dasId) {
		this.dasId = dasId;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * @return the tries
	 */
	public int getTries() {
		return tries;
	}

	/**
	 * @param tries the tries to set
	 */
	public void setTries(int tries) {
		this.tries = tries;
	}

	/**
	 * @return the enabled
	 */
	public boolean isEnabled() {
		return enabled;
	}

	/**
	 * @param enabled the enabled to set
	 */
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
}
