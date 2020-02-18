package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_login")
public class Login implements Serializable {

	@Id
	private Long idLogin;

	@OneToOne
	@JoinColumn(name = "id_login")
	@MapsId
	private User user;

	@NotNull
	@Column(name = "das_id", length = 7)
	private String username;

	@NotNull
	@Column(length = 80)
	private String password;

	@NotNull
	@Min(0)
	@Max(3)
	private Integer tries;

	@NotNull
	private Boolean enabled;

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
	public Integer getTries() {
		return tries;
	}

	/**
	 * @return the id
	 */
	public Long getIdLogin() {
		return idLogin;
	}

	/**
	 * @param id the id to set
	 */
	public void setIdLogin(Long id) {
		this.idLogin = id;
	}

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
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @param tries the tries to set
	 */
	public void setTries(Integer tries) {
		this.tries = tries;
	}

	/**
	 * @return the enabled
	 */
	public Boolean getEnabled() {
		return enabled;
	}

	/**
	 * @param enabled the enabled to set
	 */
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	private static final long serialVersionUID = 1L;
}