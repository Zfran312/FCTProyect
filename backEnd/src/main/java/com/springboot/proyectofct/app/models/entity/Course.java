package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_courses")
public class Course implements Serializable {
	
	// id curso, clave principal, autogenerada
	//@Column(name = "id_course")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idCourse;

	// nombre
	@NotEmpty
	@Column(name = "name_course", length = 60)
	private String nameCourse;

	// descripcion
	@NotEmpty
	@Column(name = "desc_course", length = 2000)
	private String descC;

	// duracion del curso
	@NotNull
	@Min(value = 1)
	@Max(value = 999)
	private Integer duration;

	// tematica
	@NotEmpty
	@Column(length = 15)
	private String topic;

	// skill
	@NotEmpty
	@Column(length = 15)
	private String level;

	// indica si el curos está publicado
	@NotNull
	private Boolean published;

	@Column(length = 200)
	private String preview;

	// ruta del curso
	@NotEmpty
	@Column(length = 100)
	private String route;
	
	@ManyToMany
	@JoinTable(name = "tb_course_skill",
	joinColumns = @JoinColumn(name ="id_course"),
	inverseJoinColumns = @JoinColumn(name ="id_skill"))
	private Set<Skill> skills;


	public Long getIdCourse() {
		return idCourse;
	}


	public void setIdCourse(Long idCourse) {
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


	public Integer getDuration() {
		return duration;
	}


	public void setDuration(Integer duration) {
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


	public Boolean getPublished() {
		return published;
	}


	public void setPublished(Boolean published) {
		this.published = published;
	}


	public String getPreview() {
		return preview;
	}


	public void setPreview(String preview) {
		this.preview = preview;
	}


	public String getRoute() {
		return route;
	}


	public void setRoute(String route) {
		this.route = route;
	}


	public Set<Skill> getSkills() {
		return skills;
	}


	public void setSkills(Set<Skill> skills) {
		this.skills = skills;
	}

	private static final long serialVersionUID = 1L;
}