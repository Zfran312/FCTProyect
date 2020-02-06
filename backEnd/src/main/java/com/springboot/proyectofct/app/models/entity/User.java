package com.springboot.proyectofct.app.models.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_users")
public class User {

	/**
	 * User primary key
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user")
	private long idUser;

	/**
	 * User das id 
	 */
	@NotNull
	@Column(name = "das_id")
	private String dasId;

	/**
	 * Name of user
	 */
	@NotNull
	@Column(name = "name_user")
	private String nameUser;

	/**
	 * First lastname of user
	 */
	@NotNull
	@Column(name = "lastname_1")
	private String lastname1;

	/**
	 * Second lastname of user
	 */
	@Column(name = "lastname_2")
	private String lastname2;

	/**
	 * Email direction of user
	 */
	@NotNull
	@Email
	private String email;

	/**
	 * Birthdate of user
	 */
	@Column(name = "birth_d")
	@Temporal(TemporalType.DATE)
	private Date birthDate;

	/**
	 * Number of telephone of user
	 */
	private String phone;

	/**
	 * Type of identifier: DNI, NIE or passport
	 */
	private String document;

	/**
	 * Number of social security
	 */
	@Column(name = "num_ss")
	private String numSS;

	/**
	 * Main roles of user
	 */
	/*private List<Role> role;*/

	/**
	 * State of user (enabled, disabled, blocked or pending activation)
	 */
	@NotNull
	@Column(name = "user_state")
	private String state;

	/**
	 * @return the idUser
	 */
	public long getIdUser() {
		return idUser;
	}

	/**
	 * @param idUser the idUser to set
	 */
	public void setIdUser(long idUser) {
		this.idUser = idUser;
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
	 * @return the nameUser
	 */
	public String getNameUser() {
		return nameUser;
	}

	/**
	 * @param nameUser the nameUser to set
	 */
	public void setNameUser(String nameUser) {
		this.nameUser = nameUser;
	}

	/**
	 * @return the lastname1
	 */
	public String getLastname1() {
		return lastname1;
	}

	/**
	 * @param lastname1 the lastname1 to set
	 */
	public void setLastname1(String lastname1) {
		this.lastname1 = lastname1;
	}

	/**
	 * @return the lastname2
	 */
	public String getLastname2() {
		return lastname2;
	}

	/**
	 * @param lastname2 the lastname2 to set
	 */
	public void setLastname2(String lastname2) {
		this.lastname2 = lastname2;
	}

	/**
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * @param email the email to set
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the birthDate
	 */
	public Date getBirthDate() {
		return birthDate;
	}

	/**
	 * @param birthDate the birthDate to set
	 */
	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	/**
	 * @return the phone
	 */
	public String getPhone() {
		return phone;
	}

	/**
	 * @param phone the phone to set
	 */
	public void setPhone(String phone) {
		this.phone = phone;
	}

	/**
	 * @return the document
	 */
	public String getDocument() {
		return document;
	}

	/**
	 * @param document the document to set
	 */
	public void setDocument(String document) {
		this.document = document;
	}

	/**
	 * @return the numSS
	 */
	public String getNumSS() {
		return numSS;
	}

	/**
	 * @param numSS the numSS to set
	 */
	public void setNumSS(String numSS) {
		this.numSS = numSS;
	}

	/**
	 * @return the role
	 */
//	public List<Role> getRole() {
//		return role;
//	}

	/**
	 * @param role the role to set
	 */
//	public void setRole(List<Role> role) {
//		this.role = role;
//	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	

}
