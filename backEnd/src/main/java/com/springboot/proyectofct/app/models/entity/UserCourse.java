package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "tb_courses_user")
public class UserCourse implements Serializable {
	
	/**
	 * Id of course
	 */
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_course")
	private Course course;

	/**
	 * Id of user
	 */
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_user")
	@JsonBackReference
	private User user;

	/**
	 * Date of deliver of the course (fecha de entrega del curso)
	 */
	@Temporal(TemporalType.DATE)
	@Column(name = "d_upload")
	@NotEmpty
	private Date dateUpload;

	/**
	 * Date of download of the course (fecha de descarga del curso)
	 */
	@Temporal(TemporalType.DATE)
	@Column(name = "d_download")
	@NotNull
	private Date dateDownload;

	/**
	 * This attribute indicates that the course is finished
	 */
	@NotNull
	private Boolean finished;

	/**
	 * Evidence of the course
	 */
	private String evidences;

	/**
	 * id of reviewer
	 *
	 * @ManyToOne(fetch = FetchType.LAZY)
	 * @Column(name = "id_reviewer")
	 * @NotNull
	 * private User reviewer;
	 */
	
	/**
	 * @return the deliverDate
	 */
	public Date getDeliverDate() {
		return dateUpload;
	}


	/**
	 * @return the dateUpload
	 */
	public Date getDateUpload() {
		return dateUpload;
	}

	/**
	 * @param dateUpload the dateUpload to set
	 */
	public void setDateUpload(Date dateUpload) {
		this.dateUpload = dateUpload;
	}

	/**
	 * @return the course
	 */
	public Course getCourse() {
		return course;
	}

	/**
	 * @param course the course to set
	 */
	public void setCourse(Course course) {
		this.course = course;
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
	 * @return the evidences
	 */
	public String getEvidences() {
		return evidences;
	}

	/**
	 * @param evidences the evidences to set
	 */
	public void setEvidences(String evidences) {
		this.evidences = evidences;
	}

	/**
	 * @param deliverDate the deliverDate to set
	 */
	public void setDeliverDate(Date deliverDate) {
		this.dateUpload = deliverDate;
	}

	/**
	 * @return the dateDownload
	 */
	public Date getDateDownload() {
		return dateDownload;
	}

	/**
	 * @param dateDownload the dateDownload to set
	 */
	public void setDateDownload(Date dateDownload) {
		this.dateDownload = dateDownload;
	}

	/**
	 * @return the finished
	 */
	public boolean isFinished() {
		return finished;
	}

	/**
	 * @param finished the finished to set
	 */
	public void setFinished(boolean finished) {
		this.finished = finished;
	}

	private static final long serialVersionUID = 1L;
}
