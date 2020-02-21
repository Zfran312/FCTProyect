package com.springboot.proyectofct.app.models.service.implementation;

import java.io.File;

import org.apache.commons.net.ftp.FTPClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.ICourseDao;
import com.springboot.proyectofct.app.models.entity.Course;
import com.springboot.proyectofct.app.models.service.ICourseService;
import com.springboot.proyectofct.app.models.service.IFtpService;

@Service
public class CourseServiceImpl implements ICourseService {

	@Autowired
	private ICourseDao courseDao;

	@Autowired
	private IFtpService iFtpService;

	@Override
	public Page<Course> findAll(int page,String paramOrder, String orden) {
		Pageable pageable;
		if(orden.equalsIgnoreCase("desc")) {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.DESC, paramOrder));
		}else {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.ASC, paramOrder));
		}
		return courseDao.findAll(pageable);
	}

	@Override
	public Course save(Course course) {
		// TODO Auto-generated method stub
		FTPClient ftp = iFtpService.connectToFtp("Localhost", "anonymous", "");
		String rute;
		if (!course.getRoute().matches("[a-zA-Z]{1,}.[a-zA-Z0-9]{2,3}")) {
			 rute = iFtpService.uploadFileToFpt(ftp, fileFtp(course.getRoute()),
					course.getRoute().split("\\\\")[2]);
		}else {
			 rute = iFtpService.uploadFileToFpt(ftp, fileFtp(course.getRoute()),
					course.getRoute());
		}
			if (rute != "") {
				course.setRoute(rute);
				iFtpService.disconnectFTP(ftp);
				return courseDao.save(course);
			}
			iFtpService.disconnectFTP(ftp);
			return null;
		
	}

	@Override
	@Transactional(readOnly = true)
	public Course findById(Long idCourse) {
		// TODO Auto-generated method stub
		return courseDao.findById(idCourse).orElse(null);
	}

	@Override
	@Transactional
	public void deleteById(Long id, String route) {
		// TODO Auto-generated method stub
		FTPClient ftp = iFtpService.connectToFtp("Localhost", "anonymous", "");
		iFtpService.removeDirectory(ftp, route);
		courseDao.deleteById(id);
	}

	@Override
	public File fileFtp(String file) {
		// TODO Auto-generated method stub
		String[] prueba;
		prueba = file.split("\\\\");
		return new File(prueba[prueba.length - 1]);
	}
	
	public Page<Course> filterNestedPage(String nameCourse, Integer durationMin, Integer durationMax, String topic, String level, int page, String paramOrder, String orden) {
		if(nameCourse.equalsIgnoreCase("null")) {nameCourse = "%";}else {nameCourse ="%" + nameCourse + "%";}
		if(topic.equalsIgnoreCase("null")) {topic = "%";}else {topic ="%" + topic + "%";}
		if(level.equalsIgnoreCase("null")) {level = "%";}else {level ="%" + level + "%";}
		Pageable pageable;
		if(orden.equalsIgnoreCase("desc")) {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.DESC, paramOrder));
		}else {
			pageable = PageRequest.of(page, 4, Sort.by(Sort.Direction.ASC, paramOrder));
		}
		return courseDao.findNestedPage(nameCourse, durationMin, durationMax, topic, level, pageable);
	}
}
