import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/nav-bar/nav-bar.service';
import { RoleService } from 'src/app/Services/role/role.service';
import { Permission } from 'src/app/Models/permission';
import Swal from 'sweetalert2';
import { Constants } from '../../Constants/constants';
import { LoginService } from 'src/app/Services/login/login.service';
import { UserService } from 'src/app/Services/user/user.service';
import { User } from 'src/app/Models/user';
import { Role } from 'src/app/Models/role';
import swal from 'sweetalert2';
import { AuthmanagerService } from '../../Services/authmanager/authmanager.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from 'src/app/Services/permission/permission.service';

declare var $: any;

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  page = Constants.CERO; pageSize = Constants.PAGESIZE; habilitar: boolean = false; habilitarFiltro: boolean = false;
  paginator: any; ordenBoolean = false; campoOrdenar = Constants.S_PARAM_ORDER_DEFAULT_ROL; orden = Constants.S_ASC;
  role: Role = { idRole: Constants.CERO, name: Constants.VACIO, description: Constants.VACIO };
  //HTML
  titulo = Constants.T_LISTAR_ROL; btnCrear = Constants.T_CREACION_ROL;
  btnFiltroRol = Constants.BTN_FILTRO_ROL; lfiltro = Constants.L_FILTRO_ROL;
  btnBuscar = Constants.BTN_BUSCAR; btnReset = Constants.BTN_RESET_FILTRO; colNombre = Constants.COL_NOMBRE; colDesc = Constants.COL_DESCRIP;
  colEdit = Constants.COL_EDIT; colElim = Constants.COL_ELIMINAR; btnEdit = Constants.BTN_EDITAR; btnEliminar = Constants.BTN_ELIM;
  user: User;
  myRoles: Role[] = [];
  listUserByRole: any[] = [];
  myR: Boolean;
  permited: Permission[] = [];

  editBtn: boolean = false;
  createBtn: boolean = false;
  deleteBtn: boolean = false;
  access: boolean = true;
  visible = false;
  resetFilter: boolean = false;
  canDelete: boolean = true;

  constructor(private navbarService: NavbarService, private roleService: RoleService,
    private userService: UserService, private loginService: LoginService, private activatedRoute: ActivatedRoute,
    private router: Router, private authmanagerService: AuthmanagerService, private permissionService: PermissionService) { }
  roles: any = [];

  reset(opcion) {
    if (this.ordenBoolean) {
      this.orden = Constants.S_ASC;
      this.ordenBoolean = false;
    } else {
      this.ordenBoolean = true;
      this.orden = Constants.S_DESC;
    }
    this.page = Constants.CERO;
    this.campoOrdenar = opcion;
    this.router.navigate([Constants.REDIREC_LIST_ROLES + this.page]);
    this.response();
  }

  response() {
    if (this.habilitarFiltro == false) {
      this.roleService.getRolesPage(this.page, this.campoOrdenar, this.orden).subscribe(
        res => {
          this.elementsPermited();
          this.roles = res.content as Role[];
          this.paginator = res;
        },
        err => console.log(Constants.LOG_FALLO)
      );
    } else {
      this.filterByRoleName(this.role.name);
    }
  }

  controlSelfEdit() {
    this.userService.filterByDasId(sessionStorage.getItem(Constants.S_USERNAME)).subscribe(
      res => {
        this.user = res;
        this.myRoles = this.user.roles;
      }
    );
  }

  checkMyRole(role: Role) {
    this.myR = false;
    for (var p of this.myRoles) {
      if (p.idRole == role.idRole) {
        this.myR = true;
      }
    }
    return this.myR;
  }

  myRoleMessage() {
    swal.fire(Constants.M_ERROR_FILTRO_ROL_P1, Constants.M_ERROR_MY_ROLE, Constants.ERROR);
  }

  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ? false : true;
  }

  cleanFilter() {
    this.role.name = Constants.VACIO;
    this.habilitarFiltro = false;
    this.page = Constants.CERO;
    this.resetFilter = false;
    this.habilitar = false;
    this.router.navigate([Constants.REDIREC_LIST_ROLES + this.page])
    this.response();
  }

  delete(role: Role): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: Constants.BTN_ST_SUCCESS,
        cancelButton: Constants.BTN_ST_DANGER
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `¿ Seguro que desea eliminar el rol ${role.name}?`,
      icon: Constants.WARNNING,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.roleService.getListUsersByRole(role.idRole).subscribe(
          res => {
            this.listUserByRole = res as any[];
            this.listUserByRole.forEach(element => {
              if (element == 1) {
                this.canDelete = false;
              }
            });
            if (this.canDelete) {
              this.roleService.delete(role.idRole).subscribe(
                response => {
                  this.roles = this.roles.filter(cli => cli !== role);
                  swalWithBootstrapButtons.fire(
                    `Eliminado!`,
                    `Rol ${role.name} eliminado con éxito.`,
                    Constants.SUCCESS
                  );
                  this.response();
                },
                err => {
                  swal.fire(`${Constants.M_ERROR_FILTRO_ROL_P1}`, `${Constants.M_ERROR_DELETE}`, Constants.ERROR);
                }
              );
            }else{
              swal.fire(`${Constants.M_ERROR_FILTRO_ROL_P1}`, `${Constants.M_ERROR_ROLE_WITH_USERS}`, Constants.ERROR);
            }
          },
          err=>{
            swal.fire(`${Constants.M_ERROR_FILTRO_ROL_P1}`, `${Constants.M_ERROR_DELETE}`, Constants.ERROR);
          }
        );
      }
    });
  }

  filterByRoleName(term: string) {
    if (!this.habilitarFiltro) {
      this.page = Constants.CERO;
      this.router.navigate([Constants.REDIREC_LIST_ROLES + this.page])
    }
    if (!this.resetFilter) {
      this.campoOrdenar = Constants.S_PARAM_ORDER_DEFAULT_ROL;
      this.orden = Constants.S_ASC;
      this.ordenBoolean = false;
    }
    this.resetFilter = true;
    this.habilitarFiltro = true;
    this.habilitar = false;
    this.roleService.filterByRoleNamePage(term, this.page, this.campoOrdenar, this.orden).subscribe(
      res => {
        this.roles = res.content as Role[];
        this.paginator = res;
      },
      err => {
        Swal.fire(Constants.M_ERROR_FILTRO_ROL_P1, Constants.M_ERROR_FILTRO_ROL_P2, Constants.ERROR),
          console.log(err);
      }
    );
  }

  elementsPermited() {
    this.permissionService.elementsPermited("Role").subscribe(
      res => {
        this.permited = res as Permission[];
        this.checkPermission();
        this.controlSelfEdit();
        this.visible = true;
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
      if (this.permited[p].id.element.identifier.includes("Delete")) {
        this.deleteBtn = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("Create")) {
        this.createBtn = this.permited[p].permited;
      }
      if (this.permited[p].id.element.identifier.includes("lbl")) {
        this.access = this.permited[p].permited;
      }
    }
  }

  ngOnInit() {
    this.authmanagerService.checkAuth();
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.page = +params.get(Constants.S_PAGE);
        if (!this.page) {
          this.page = Constants.CERO;
        }
        this.navbarService.show();
        this.response();
      }
    );
  }
}
