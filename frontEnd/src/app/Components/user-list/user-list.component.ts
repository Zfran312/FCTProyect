import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/nav-bar/nav-bar.service';
import { UserService } from 'src/app/Services/user/user.service';
import { User } from '../../Models/user';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Constants } from '../../Constants/constants'
import { AuthmanagerService } from '../../Services/authmanager/authmanager.service';
import { LoginService } from 'src/app/Services/login/login.service';
import { Permission } from 'src/app/Models/permission';
import { PermissionService } from 'src/app/Services/permission/permission.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  page: number; pageSize = Constants.PAGESIZE; habilitar: boolean = false; users: any = []; habilitarFiltro: boolean = false;
  paginator: any; campoOrdenar: string = Constants.S_PARAM_ORDER_DEFAULT_USER; orden = 'asc'; ordenBoolean = false;
  //HTML
  titulo = Constants.T_LIST_USUARIOS; btnCrear = Constants.T_CREAR_USUARIO; btnFiltro = Constants.BTN_FILTRO_USUARIO; lDas = Constants.L_DAS;
  btnBuscar = Constants.BTN_BUSCAR; btnReset = Constants.BTN_RESET_FILTRO; colDas = Constants.COL_DAS; colNombre = Constants.COL_NOMBRE;
  colApel1 = Constants.COL_APEL1; colApel2 = Constants.COL_APEL2; colEmail = Constants.COL_EMAIL; colEdit = Constants.COL_EDIT; colElim = Constants.COL_ELIMINAR;
  btnEdit = Constants.BTN_EDITAR; btnElim = Constants.BTN_ELIM; colEstado = Constants.COL_ESTADO;
  lnombre = Constants.L_NOMBRE; lapel1 = Constants.L_APELLIDO1; lapel2 = Constants.L_APELLIDO2; usuarioDesabilitar: User;
  //validaciones
  patternDas = Constants.M_VAL_DAS_PATTERN; patternNombre = Constants.M_VAL_NOMBRE_PATTERN; patternApel1 = Constants.M_VAL_APEL1_PATTERN;
  patternApel2 = Constants.M_VAL_APEL2_PATTERN;

  user: User = {
    idUser: Constants.CERO, dasId: Constants.VACIO, nameUser: Constants.VACIO, lastname1: Constants.VACIO, lastname2: Constants.VACIO, email: Constants.VACIO,
    birthDate: Constants.VACIO, phone: Constants.VACIO, document: Constants.VACIO, numSS: Constants.VACIO, status: Constants.CERO, deleted: false, roles: []
  };

  userNested: User = {
    idUser: Constants.CERO, dasId: Constants.VACIO, nameUser: Constants.VACIO, lastname1: Constants.VACIO, lastname2: Constants.VACIO, email: Constants.VACIO,
    birthDate: Constants.VACIO, phone: Constants.VACIO, document: Constants.VACIO, numSS: Constants.VACIO, status: Constants.CERO, deleted: false, roles: []
  };

  permited: Permission[] = [];

  editBtn: boolean = false;
  createBtn: boolean = false;
  deleteBtn: boolean = false;
  access: boolean = true;
  visible: boolean = false;
  resetFilter: boolean = false;

  constructor(private navbarService: NavbarService, private userService: UserService, private loginService: LoginService,
              private activatedRoute: ActivatedRoute, private router: Router, private authmanagerService: AuthmanagerService,
              private permissionService: PermissionService) { }

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
    this.router.navigate([Constants.REDIREC_LIST_USUARIOS + this.page]);
    this.response(this.page, this.campoOrdenar, this.orden);
  }

  desHabilitarEliminar() {
    this.userService.filterByDasId(sessionStorage.getItem(Constants.S_USERNAME)).subscribe(
      res => {
        this.usuarioDesabilitar = res;
        this.elementsPermited();
        this.response(this.page, this.campoOrdenar, this.orden);
      }
    );
  }

  response(page: number, paramOrder: string, ordenado: string) {
    if (this.habilitarFiltro == false) {
      this.userService.getUserPage(page, paramOrder, ordenado).subscribe(
        res => {
          this.elementsPermited();
          this.users = res.content as User[];
          this.paginator = res;
          this.visible = true;
        },
        err => console.log(Constants.LOG_FALLO)
      );
    } else {
      this.filterNested(this.user, paramOrder, ordenado);
    }
  }

  /*   Metodos Ver de los atributos.
  verBithDate(fech: Date){
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    const formattedDate = formatDate(fech, format, locale);
    Swal.fire('Fecha de nacimiento:\n'+ formattedDate);
  }

  verNumSS(nSS: string){
    Swal.fire('Número de Seguridad Social:\n'+ nSS);
  }

  verDocument(document: string){
    Swal.fire('Documento Identificativo:\n'+ document);
  }

  verPhone(phone: number){
    Swal.fire('Número de Telefono:\n'+ phone);
  } */
  /*   Fin Metodos Ver de los atributos.   */

  delete(user: User): void {
    if (user.dasId != this.usuarioDesabilitar.dasId) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: Constants.BTN_ST_SUCCESS,
          cancelButton: Constants.BTN_ST_DANGER
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: `¿ Seguro que desea eliminar el usuario ${user.nameUser}?`,
        icon: Constants.WARNNING,
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.userService.deleteUser(user.idUser).subscribe(
            response => {
              this.users = this.users.filter(cli => cli !== user)
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                `Usuario ${user.nameUser} eliminado con éxito.`,
                Constants.SUCCESS
              );
              this.response(this.page, this.campoOrdenar, this.orden);
            },
            err => {
              Swal.fire(`${Constants.M_ERROR_FILTRO_USUARIO_P1}`, `${Constants.M_ERROR_USER_WITH_LOGIN}`, Constants.ERROR);
            }
          );
        }
      });
    } else {
      Swal.fire(
        Constants.T_ERROR_ALERTA,
        Constants.M_ERROR_ELIM_USUARIO_SESION,
        Constants.ERROR
      )
    }
  }
  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ? false : true;
  }

  filterByDas(term: string) {
    this.userService.filterByDasId(term).subscribe(
      res => this.users = res,
      err => {
        Swal.fire(Constants.M_ERROR_FILTRO_USUARIO_P1, Constants.M_ERROR_FILTRO_USUARIO_P2, Constants.ERROR),
          console.log(Constants.LOG_FALLO);
      }
    );
  }

  elementsPermited() {
    this.permissionService.elementsPermited("User").subscribe(
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

  cleanFilter() {
    this.user.dasId = Constants.VACIO,
    this.user.nameUser = Constants.VACIO,
    this.user.lastname1 = Constants.VACIO,
    this.user.lastname2 = Constants.VACIO
    this.habilitarFiltro = false;
    this.page = Constants.CERO;
    this.habilitar = false;
    this.resetFilter = false;
    this.orden = Constants.S_ASC;
    this.campoOrdenar = Constants.S_PARAM_ORDER_DEFAULT_USER;
    this.router.navigate([Constants.REDIREC_LIST_USUARIOS+ this.page])
    this.response(this.page, this.campoOrdenar, this.orden);
  }

  filterNested(user: User, paramOrder: string, ordenado: string) {
    if (!this.habilitarFiltro) {
      this.page = Constants.CERO;
      this.router.navigate([Constants.REDIREC_LIST_USUARIOS + this.page])
    }
    if(!ordenado || !paramOrder){
      ordenado = Constants.S_ASC;
      paramOrder = Constants.S_PARAM_ORDER_DEFAULT_USER;
    }
    this.resetFilter = true;
    this.habilitar = false;
    this.habilitarFiltro = true;
    this.userService.filterNestedPage(user, this.page, paramOrder, ordenado).subscribe(
      res => {
        this.users = res.content as User[]
        this.paginator = res
      },
      err => {
        Swal.fire(Constants.T_ERROR_ALERTA, Constants.M_ERROR_FILTRO_ANIDADO, Constants.ERROR),
          console.log(Constants.LOG_FALLO);
      }
    );
  }

  ngOnInit() {
    this.authmanagerService.checkAuth();
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.page = + params.get(Constants.S_PAGE);
        if (!this.page) {
          this.page = Constants.CERO;
        }
        this.navbarService.show();
        this.desHabilitarEliminar();
      }
    );
  }
}
