package com.springboot.proyectofct.app.models.entity;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "tb_permissions")
public class Permission implements Serializable {

	/**
	 * Contains the element and the role of an individual permission.
	 */
	@EmbeddedId
	@NotNull
	private PermissionsPk id;

	/**
	 * true if the element is pemited in the role.
	 */
	@NotNull
	private Boolean permited;

	@SuppressWarnings("serial")
	@Embeddable
	public static class PermissionsPk implements Serializable{
		
		/**
		 * Id of the role
		 */
		@ManyToOne(targetEntity = Role.class)
		//@JsonManagedReference
		@JoinColumn(name = "id_role")
		private Role role;

		/**
		 * Id of the element
		 */
		@ManyToOne(targetEntity = Element.class)
		//@JsonManagedReference
		@JoinColumn(name = "id_element")
		private Element element;

		
		/**
		 * @return role
		 */
		public Role getRole() {
			return role;
		}

		public void setRole(Role role) {
			this.role = role;
		}

		
		/**
		 * @return element
		 */
		public Element getElement() {
			return element;
		}

		public void setElement(Element element) {
			this.element = element;
		}
		
	}
	
	
	/**
	 * @return id
	 */
	public PermissionsPk getId() {
		return id;
	}

	public void setId(PermissionsPk id) {
		this.id = id;
	}

	
	/**
	 * @return permited
	 */
	public Boolean getPermited() {
		return permited;
	}
	
	/**
	 * Set permited to the param value
	 * 
	 * @param permited
	 */
	public void setPermited(Boolean permited) {
		this.permited = permited;
	}

	private static final long serialVersionUID = 1L;
}
