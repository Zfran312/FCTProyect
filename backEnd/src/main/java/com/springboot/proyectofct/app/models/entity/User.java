package com.springboot.proyectofct.app.models.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user")
	private long idUser;

	@NotNull
	@Column(name = "das_id")
	private String dasId;

	@NotNull
	@Column(name = "name_user")
	private String nameUser;

	@NotNull
	@Column(name = "lastname_1")
	private String lastname1;

	@Column(name = "lastname_2")
	private String lastname2;

	@NotNull
	@Email
	private String email;

	// Fecha de nacimiento
	@Column(name = "birth_d")
	@Temporal(TemporalType.DATE)
	private Date birthDate;

	// Numero de telefono

	private String phone;

	// Tipo de identificador: DNI, NIE o pasaporte

	private String document;

	// Numero de la seguridad social
	@Column(name = "num_ss")
	private String numSS;

	// private Role rol;

	@NotNull
	@Column(name = "user_state")
	private String state;

	public long getIdUser() {
		return idUser;
	}

	public void setIdUser(long idUser) {
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

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}
