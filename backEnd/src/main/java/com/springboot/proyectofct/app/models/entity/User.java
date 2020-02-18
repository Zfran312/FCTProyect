package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "tb_users")
public class User implements Serializable {

	/**
	 * User primary key
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user")
	private Long idUser;

	/**
	 * User das id
	 */
	@NotNull
	@Column(name = "das_id", length = 7, unique = true)
	private String dasId;

	/**
	 * Name of user
	 */
	@NotNull
	@Column(name = "name_user", length = 25)
	private String nameUser;

	/**
	 * First lastname of user
	 */
	@NotNull
	@Column(name = "lastname_1", length = 25)
	private String lastname1;

	/**
	 * Second lastname of user
	 */
	@Column(name = "lastname_2", length = 25)
	private String lastname2;

	/**
	 * Email direction of user
	 */
	@NotNull
	@Email
	@Column(length = 60)
	private String email;

	/**
	 * Birthdate of user
	 */
	@NotNull
	@Column(name = "birth_d")
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date birthDate;

	/**
	 * Number of telephone of user
	 */
	@Column(length = 25)
	private String phone;

	/**
	 * Type of identifier: DNI, NIE or passport
	 */
	@Column(length = 20)
	private String document;

	/**
	 * Number of social security
	 */
	@Column(name = "num_ss", length = 14)
	private String numSS;

	/**
	 * State of user (enabled, disabled, blocked or pending activation)
	 */
	@NotNull
	@Column(name = "user_status")
	@Min(0)
	@Max(3)
	private Integer status;
	
	/**
	 * State of user (enabled, disabled, blocked or pending activation)
	 */
	@NotNull
	@Column(name = "deleted")
	private Boolean deleted;
	
	@OneToMany(mappedBy = "user")
	private Set<UserCourse> userCourse;

	// relacion usuarios con roles
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tb_authorities",
	joinColumns = @JoinColumn(name ="id_user"),
	inverseJoinColumns = @JoinColumn(name ="id_role"))
	private Set<Role> roles = new HashSet<Role>();

	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
	}

	public String getDasId() {
		return dasId;
	}

	public void setDasId(String dasId) {
		this.dasId = dasId;
	}

	public String getNameUser() {
		return nameUser;
	}

	public void setNameUser(String nameUser) {
		this.nameUser = nameUser;
	}

	/**
	 * @return the lastname1
	 */
	public String getLastname1() {
		return lastname1;
	}

	public void setLastname1(String lastname1) {
		this.lastname1 = lastname1;
	}

	public String getLastname2() {
		return lastname2;
	}

	public void setLastname2(String lastname2) {
		this.lastname2 = lastname2;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public String getNumSS() {
		return numSS;
	}

	public void setNumSS(String numSS) {
		this.numSS = numSS;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Set<UserCourse> getUserCourse() {
		return userCourse;
	}

	public void setUserCourse(Set<UserCourse> userCourse) {
		this.userCourse = userCourse;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
	private static final long serialVersionUID = 1L;
}