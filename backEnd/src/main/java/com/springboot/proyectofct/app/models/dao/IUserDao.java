package com.springboot.proyectofct.app.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.springboot.proyectofct.app.models.entity.User;

public interface IUserDao extends CrudRepository<User, Long>{

}
