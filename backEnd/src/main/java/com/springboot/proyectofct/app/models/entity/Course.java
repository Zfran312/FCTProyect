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
@Table(name = "tb_courses")
public class Course implements Serializable{

	private static final long serialVersionUID = 1L;
	
	// id curso, clave principal, autogenerada
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_course")
	private long idCourse;
	
	//nombre
	@NotEmpty
	@Column(name = "name_course")
	private String nameCourse;
	
	//descripcion
	@NotEmpty
	@Column(name = "desc_c")
	private String descC;
	
	//duracion del curso
	@NotEmpty
	private String duration;
	
	//tematica
	@NotEmpty
	private String topic;
	
	//skill
	@NotEmpty
	private String level;
	
	//indica si el curos está publicado
	@NotNull
	private boolean enabled;
	
	//ruta del curso
	@NotEmpty
	private String route;

	public long getIdCourse() {
		return idCourse;
	}

	public void setIdCourse(long idCourse) {
		this.idCourse = idCourse;
	}

	public String getNameCourse() {
		return nameCourse;
	}

	public void setNameCourse(String nameCourse) {
		this.nameCourse = nameCourse;
	}

	public String getDescC() {
		return descC;
	}

	public void setDescC(String descC) {
		this.descC = descC;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	
}
