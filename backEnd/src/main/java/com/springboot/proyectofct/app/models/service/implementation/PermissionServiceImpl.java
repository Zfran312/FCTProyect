package com.springboot.proyectofct.app.models.service.implementation;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.proyectofct.app.models.dao.IPermissionDao;
import com.springboot.proyectofct.app.models.entity.Element;
import com.springboot.proyectofct.app.models.entity.Permission;
import com.springboot.proyectofct.app.models.entity.Permission.PermissionsPk;
import com.springboot.proyectofct.app.models.entity.Role;
import com.springboot.proyectofct.app.models.service.IElementService;
import com.springboot.proyectofct.app.models.service.IPermissionService;
import com.springboot.proyectofct.app.models.service.IRoleService;

@Service
public class PermissionServiceImpl implements IPermissionService{

	@Autowired
	private IPermissionDao permissionDao;
	
	@Autowired
	private IRoleService roleService;
	
	@Autowired
	private IElementService elementService;
	
	@Override
	@Transactional(readOnly = true)
	public List<Permission> findAll() {
		return (List<Permission>) permissionDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Permission> findByAnyId(Permission permission) {
		return (List<Permission>) permissionDao.findAllByAnyId(permission.getId().getRole(), permission.getId().getElement());
	}

	@Override
	@Transactional(readOnly = true)
	public List<Permission> findByRole(Role role) {
		return permissionDao.findAllByRole(role);
	}

	@Override
	@Transactional
	public List<Permission> savePermission(List<Element> elements, Long idRole) {
		List<Permission> permissions = new ArrayList<Permission>();
		Role role = roleService.findById(idRole);
		Permission perm;
		PermissionsPk id;
		for(int i = 0; i<elements.size(); i++) {
			perm = new Permission();
			id = new PermissionsPk();
			id.setRole(role);
			id.setElement(elements.get(i));
			perm.setId(id);
			perm.setPermited(true);
			permissions.add(permissionDao.save(perm));
		}
		return permissions;
	}

	@Override
	@Transactional
	public List<Permission> saveAllPermissions(List<Permission> permissions) {
		for(Permission perm: permissions) {
			permissionDao.save(perm);
		}
		return permissions;
	}

	@Transactional(readOnly = true)
	@Override
	public Permission findById(PermissionsPk id) {
		return permissionDao.findByTheId(id);
	}

	@Override
	public List<Permission> validPermission(String screen, Set<Role> roleList) {
		List<Permission> elementsPermited = new ArrayList<Permission>();
		List<Element> eleList = elementService.findLikeScreen(screen);
		Permission perm;
		for(Role role : roleList) {
			for(int i = 0; i<eleList.size(); i++) {
				PermissionsPk id = new PermissionsPk();
				id.setElement(eleList.get(i));
				id.setRole(role);
				perm = permissionDao.findByTheId(id);
				if(elementsPermited.size()<(i+1)) {
					elementsPermited.add(perm);
				}else if(!elementsPermited.get(i).getPermited() && perm.getPermited()) {
					elementsPermited.get(i).setId(id);
					elementsPermited.get(i).setPermited(true);
				}
			}
		}
		return elementsPermited;
	}


}
