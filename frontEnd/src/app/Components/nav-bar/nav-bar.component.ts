import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavbarService } from './../../Services/nav-bar/nav-bar.service';
import { Constants } from '../../Constants/constants';
import { Permission } from '../../Models/permission';
import { UserService } from '../../Services/user/user.service';
import { PermissionService } from '../../Services/permission/permission.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user = Constants.USER_DAFAULT; icon = Constants.ICON; menuUsuario = Constants.S_M_USUARIO; menuRoles = Constants.S_M_ROLES; menuHabilidades = Constants.S_M_HABILIDADES;
  menuCursos = Constants.S_M_CURSOS; btnCreaRol = Constants.T_CREACION_ROL; btnCreaCurso = Constants.T_CREACION_CURSO; btnCreaUsuario = Constants.T_CREAR_USUARIO;
  btnSalir = Constants.S_SALIR; menuPerfil = Constants.S_M_PERFIL; menuCrear = Constants.S_CREAR; vacio = Constants.S_ESPACIO; coma = Constants.S_COMA; navigationSubscription;

  permited: Permission[]; usersLbl: boolean = false; coursesLbl: boolean = false; rolesLbl: boolean = false; skillsLbl: boolean = false;

  constructor(public navbarService: NavbarService, private router: Router, private userService: UserService, private permissionService: PermissionService) {
    // suscribirse a los eventos del enrutador. Almacene la suscripción para que podamos unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // Si es un evento NavigationEnd, reinicialice el componente
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites() {
    // Cargar valores del nombre por defecto para que cuando edites te cambie el nombre
    this.cargarUsuario();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  //Cargar los datos del usuario
  cargarUsuario() {
    this.userService.filterByDasId(sessionStorage.getItem(Constants.S_USERNAME)).subscribe(
      res => {
        this.user = res;
      },
      err => console.log(Constants.LOG_FALLO)
    );
  }

  //recupera los elementos asociados a la pantalla y comprueba si tienes permisos para acceder a ellos
  elementsPermited() {
    this.permissionService.elementsPermited("lbl").subscribe(
      res => {
        this.permited = res as Permission[];
        this.checkPermission();
      },
      err => {
        console.log(err);
      }
    );
  }

  //comprueba si tienes permisos para acceder a los elementos de la pantalla
  checkPermission() {
    for (var p = Constants.CERO; p < this.permited.length; p++) {
      if (this.permited[p].id.element.identifier.includes("Users")) {
        this.usersLbl = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("Roles")) {
        this.rolesLbl = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("Courses")) {
        this.coursesLbl = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("Skills")) {
        this.skillsLbl = this.permited[p].permited;
      }
    }
  }

  //Metodo que se lanza al inicio
  ngOnInit() {
    this.cargarUsuario();
    this.elementsPermited();
  }

  //Desconectarse
  public logout() {
    sessionStorage.clear();
    this.router.navigate([Constants.REDIREC_LOGIN]);
  }
}
