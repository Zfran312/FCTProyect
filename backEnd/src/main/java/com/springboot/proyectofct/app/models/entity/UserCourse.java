package com.springboot.proyectofct.app.models.entity;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;


/**
 * 
 * @author a759465 (Víctor García)
 *
 *         This class reference the connection between user and course
 */
@Entity
public class UserCourse {

	/**
	 * Id of course
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@Column(name = "id_course")
	private Course course;

	/**
	 * Id of user
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@Column(name = "id_user")
	private User user;

	/**
	 * Date of deliver of the course (fecha de entrega del curso)
	 */
	@Temporal(TemporalType.DATE)
	@Column(name = "d_upload")
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
	private boolean finished;

	/**
	 * Evidence of the course
	 */
	private String evidences;

	/**
	 * id of reviewer
	 *
	 *@ManyToOne(fetch = FetchType.LAZY)
	 *@Column(name = "id_reviewer")
	 *private User reviewer;
	 */

	/**
	 * @return the deliverDate
	 */
	public Date getDeliverDate() {
		return dateUpload;
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

}

