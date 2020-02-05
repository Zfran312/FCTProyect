package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "courses")
public class Course implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id_course;
	
	@NotEmpty
	private String name_course;
	
	@NotEmpty
	private String desc_c;
	
	@NotEmpty
	private String duration;
	
	@NotEmpty
	private String topic;
	
	@NotEmpty
	private String level;
	
	@NotNull
	private boolean enabled;
	
	@NotEmpty
	private String route;

	
	public long getId_course() {
		return id_course;
	}

	public void setId_course(long id_course) {
		this.id_course = id_course;
	}

	public String getName_course() {
		return name_course;
	}

	public void setName_course(String name_course) {
		this.name_course = name_course;
	}

	public String getDesc_c() {
		return desc_c;
	}

	public void setDesc_c(String desc_c) {
		this.desc_c = desc_c;
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
