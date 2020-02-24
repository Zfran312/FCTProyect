import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavBarService } from './../../Services/nav-bar/nav-bar.service';
import { Constants } from '../../Constants/constants';
import { LoginService } from './../../Services/login/login.service';
import { Permission } from './../../Models/permission';
/*import { UserService } from 'src/app/Services/user/user.service';*/
/*import { PermissionService } from 'src/app/Services/permission/permission.service';*/

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user= Constants.USER_DAFAULT; icon = Constants.ICON;  menuUsuario = Constants.S_M_USUARIO;  menuRoles = Constants.S_M_ROLES; menuHabilidades = Constants.S_M_HABILIDADES;
  menuCursos = Constants.S_M_CURSOS; btnCreaRol = Constants.T_CREACION_ROL; btnCreaCurso = Constants.T_CREACION_CURSO; btnCreaUsuario = Constants.T_CREAR_USUARIO;
  btnSalir = Constants.S_SALIR; menuPerfil = Constants.S_M_PERFIL; menuCrear = Constants.S_CREAR; vacio = Constants.S_ESPACIO; coma = Constants.S_COMA; navigationSubscription;
    
  permited: Permission[]; usersLbl: boolean = false; coursesLbl: boolean = false; rolesLbl: boolean = false; skillsLbl: boolean = false;

  constructor(public navbarService: NavBarService, private router: Router, /*private userService: UserService,*/ 
        private loginService: LoginService, /*private permissionService: PermissionService*/) {
    // suscribirse a los eventos del enrutador. Almacene la suscripción para que podamos
   // unsubscribe later.
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

  cargarUsuario(){
    this.userService.filterByDasId(sessionStorage.getItem(Constants.S_USERNAME)).subscribe(
      res=>{
        this.user = res;
      },
      err=> console.log(Constants.LOG_FALLO)
    );
  }

  elementsPermited(){
    this.permissionService.elementsPermited("lbl").subscribe(
      res =>{
        this.permited = res as Permission[];
        this.checkPermission();
      },
      err =>{
        console.log(err);
      }
    );
  }

  checkPermission(){
    for(var p = 0; p<this.permited.length; p++){
      if(this.permited[p].id.element.identifier.includes("Users")) {
        this.usersLbl = this.permited[p].permited;
      }
      if(this.permited[p].id.element.identifier.includes("Roles")) {
        this.rolesLbl = this.permited[p].permited;
      }
      if(this.permited[p].id.element.identifier.includes("Courses")) {
        this.coursesLbl = this.permited[p].permited;
      }
      if(this.permited[p].id.element.identifier.includes("Skills")) {
        this.skillsLbl = this.permited[p].permited;
      }
    }
  }

  ngOnInit() {
    this.cargarUsuario();
    this.elementsPermited();
  }

  public logout() {
    sessionStorage.clear();
    this.router.navigate([Constants.REDIREC_LOGIN]);
  }
}
