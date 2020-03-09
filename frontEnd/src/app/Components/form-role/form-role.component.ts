import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/Models/role';
import { RoleService } from 'src/app/Services/role/role.service';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Permission, PkPermission } from 'src/app/Models/permission';
import { Element } from 'src/app/Models/element';
import { NavbarService } from 'src/app/Services/nav-bar/nav-bar.service';
import { PermissionService } from 'src/app/Services/permission/permission.service';
import { Constants } from '../../Constants/constants';
import { AuthmanagerService } from '../../Services/authmanager/authmanager.service';
import { LoginService } from 'src/app/Services/login/login.service';
import { UserService } from 'src/app/Services/user/user.service';
import { User } from 'src/app/Models/user';


@Component({
  selector: 'app-form-role',
  templateUrl: './form-role.component.html',
  styleUrls: ['./form-role.component.css']
})
export class FormRoleComponent implements OnInit {

  // CREACION DEL OBJETO ROL
  role: Role = { idRole: Constants.CERO, description: Constants.VACIO, name: Constants.VACIO, users: [] };

  // VARIABLE NECESARIA PARA DIFERENCIAR UNA CREACION DE UNA EDICION
  isUpdating = false;

  // HTML
  titulo = Constants.T_CREACION_ROL; lNombre = Constants.L_NOMBRE; ldesc = Constants.L_DESCRIPCION;
  btnEnviar = Constants.BTN_ENVIAR; btnVolver = Constants.BTN_VOLVER;

  roleData: Role = { idRole: 0, description: '', name: '' };
  formato = Constants.FORMATO;

  permited: Permission[];

  editBtn: boolean = false;
  createBtn: boolean = false;
  access: boolean = false;
  canUse: boolean = true;

  editando: boolean = false;
  data: Element[] = [];
  confirmed = [];
  allUsers: any;
  confirmedUser = [];

  permissions: Permission[];

  // VALIDACIONES
  valRequired = Constants.M_VAL_REQUIRED; valNombrePattern = Constants.M_VAL_NOMBRE_ROL_PATTERN;
  valDescripPattern = Constants.M_VAL_DESCRIP_ROL_PATTERN;

  // CONTRUCTOR
  constructor(public roleService: RoleService, private router: Router,
    private activatedRoute: ActivatedRoute, public navbarService: NavbarService,
    private permService: PermissionService, private loginService: LoginService,
    private authmanagerService: AuthmanagerService, private userService: UserService) { }


  // ngOnInit METODO QUE SE EJECUTA CADA VEZ SE CARGUE EL COMPONENTE
  ngOnInit(): void {
    this.authmanagerService.checkAuth();
    this.navbarService.show();
    const params = this.activatedRoute.snapshot.params;
    this.userService.getUsers().subscribe(
      res => {
        this.allUsers = res;
        this.data = this.allUsers;
        if (params.id) { // XBS 15/07/2019 Al usar el mismo form para guardar que para editar, si recibe un id, estoy editando
          this.editando = true;
          this.roleService.getListUsersRole(params.id).subscribe(
            res => {
              this.confirmedUser = res;
            }
          );
          this.roleService.getRole(params.id).subscribe(
            res => {
              this.role = res;
              this.loadPermissions(this.role);
              this.isUpdating = true; // XBS 15/07/2019 Marca la acción como update, que lee el formulario
              this.titulo = Constants.T_EDICION_ROL;
            },
            err => {
              swal.fire(Constants.M_ERROR_CARGA_UPDATE_P1, Constants.M_ERROR_CARGA_UPDATE_P2, Constants.ERROR);
              console.error(err);
            }
          );
        }
      });

    this.elementsPermited();
  }

  elementsPermited() {
    this.permService.elementsPermited("Role").subscribe(
      res => {
        this.permited = res as Permission[];
        this.checkPermission();
      },
      err => {
        console.log(err);
      }
    );
  }

  checkPermission() {
    for (var p = 0; p < this.permited.length; p++) {
      if (this.permited[p].id.element.identifier.includes("Edit")) {
        this.editBtn = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("Create")) {
        this.createBtn = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("lblRoles")) {
        this.access = this.permited[p].permited;
      }
    }
    this.permitedEditCreate();
  }

  permitedEditCreate() {
    if (this.editando) {
      if (!this.editBtn || !this.access) {
        this.canUse = false;
      }
    } else {
      if (!this.createBtn || !this.access) {
        this.canUse = false;
      }
    }
  }

  loadPermissions(role: Role) {
    this.permService.getPermissionByRole(role).subscribe(
      res => {
        this.permissions = res as Permission[];
        for (var perm in this.permissions) {
          this.data.push(this.permissions[perm].id.element);
          if (this.permissions[perm].permited) {
            this.confirmed.push(this.permissions[perm].id.element);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  // METODO PARA VOLVER A PAGINA ANTERIOR
  volver() {
    this.navbarService.returnBack();
  }

  // EDITAR ROL
  updateRole() {
    this.role.users = this.confirmedUser;
    this.updatePermissions();
    this.roleService.updateRole(this.role.idRole, this.role).subscribe(
      role => {
        var users: User[] = this.role.users;
        users.forEach(user => {
          user.roles.push(role)
        });
        this.userService.addUsers(users).subscribe(
          res => {
            swal.fire(Constants.M_EDITAR_ROL_P1, `${role.name + Constants.M_EDITAR_ROL_P2}`, Constants.SUCCESS);
            this.router.navigate([Constants.REDIREC_LIST_ROLES + Constants.CERO]);
          }
        )
      },
      err => {
        swal.fire(Constants.M_ERROR_UPDATE_P1, Constants.M_ERROR_UPDATE_P2, Constants.ERROR);
        console.log(err);
      }
    );
  }

  updatePermissions() {
    this.permissions = [];
    var permission: Permission;
    var pkPermission: PkPermission;
    for (var p in this.data) {
      pkPermission = new PkPermission;
      pkPermission.element = this.data[p];
      pkPermission.role = this.role;
      permission = new Permission;
      permission.id = pkPermission;
      if (this.confirmed.includes(this.data[p])) {
        permission.permited = true;
      } else {
        permission.permited = false;
      }
      this.permissions.push(permission);
    }
    this.permService.updatePermissions(this.permissions).subscribe(
      res => {
        console.log("OK");
      },
      err => {
        console.log(err);
      }
    );
  }

  // GUARDAR ROL
  saveNewRole() {
    delete this.role.idRole;
    this.role.users = this.confirmedUser;
    this.roleService.addRole(this.role).subscribe(
      role => {
        var users: User[] = this.role.users;
        users.forEach(user => {
          user.roles.push(role)
        });
        this.userService.addUsers(users).subscribe(
          res => {
            swal.fire(Constants.M_CREADO_ROL_P1, `${role.name + Constants.M_CREADO_ROL_P2}`, Constants.SUCCESS);
            this.router.navigate([Constants.REDIREC_SET_PERMISSIONS + role.idRole]);
          }
        )
        this.roleData = role;
        this.permService.setRole(this.roleData);
      },
      err => {
        swal.fire(Constants.M_ERROR_CREACION_ROL_P1, Constants.M_ERROR_CREACION_ROL_P2, Constants.ERROR);
        console.error(err);
      }
    );
  }

}
