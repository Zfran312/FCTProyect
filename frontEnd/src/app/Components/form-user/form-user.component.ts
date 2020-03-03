import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Services/nav-bar/nav-bar.service';
import { User } from 'src/app/Models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user/user.service';
import swal from 'sweetalert2';
import { RoleService } from 'src/app/Services/role/role.service';
import { Constants } from '../../Constants/constants';
import { AuthmanagerService } from '../../Services/authmanager/authmanager.service';
import { LoginService } from 'src/app/Services/login/login.service';
import { Permission } from 'src/app/Models/permission';
import { PermissionService } from 'src/app/Services/permission/permission.service';

// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent implements OnInit {

  // VARIABLES HTML
  titulo = Constants.VACIO; sameUser = false; allRoles: any; formato = Constants.FORMATO; documento; insert_date; Value = Constants.S_DNI;
  data: any; confirmed = []; confirmedResp = []; isUpdating = false;
  min_date = 18 * 60 * 60 * 24 * 365 * 1000; limit_date; ResetDate; dasValido: boolean;

  // HTML
  lDas = Constants.L_DAS; lIdent = Constants.L_IDENTIFICADOR; opDni = Constants.S_DNI; opNie = Constants.S_NIE;
  opPassport = Constants.S_PASSPORT; lnSS = Constants.L_SS; lnombre = Constants.L_NOMBRE; lapel1 = Constants.L_APELLIDO1;
  lapel2 = Constants.L_APELLIDO2; ltlf = Constants.L_TELEFONO; lemail = Constants.L_EMAIL; lFech = Constants.L_FECH;
  lroles = Constants.L_ROLES; btnEnviar = Constants.BTN_ENVIAR; btnVolver = Constants.BTN_VOLVER;

  // Validaciones HTML
  valRequired = Constants.M_VAL_REQUIRED; valDasLenght = Constants.M_VAL_DAS_MAX_MIN_LENGHT; valDasPattern = Constants.M_VAL_DAS_PATTERN;
  valIdentificadorLenght = Constants.M_VAL_IDENTIFICADOR_MAX_MIN_LENGHT; valDniPattern = Constants.M_VAL_DNI_PATTERN;
  valNiePattern = Constants.M_VAL_NIE_PATTERN; valPassportPattern = Constants.M_VAL_PASSPORT_PATTERN;
  valSSLenght = Constants.M_VAL_SS_MAX_MIN_LENGHT; valSSPattern = Constants.M_VAL_SS_PATTERN;
  valNombreLenght = Constants.M_VAL_NOMBRE_MAX_MIN_LENGHT; valNombrePattern = Constants.M_VAL_NOMBRE_PATTERN;
  valApel1Lenght = Constants.M_VAL_APEL1_MAX_MIN_LENGHT; valApel1Pattern = Constants.M_VAL_APEL1_PATTERN;
  valApel2Lenght = Constants.M_VAL_APEL2_MAX_MIN_LENGHT; valApel2Pattern = Constants.M_VAL_APEL2_PATTERN;
  valTlfLenght = Constants.M_VAL_TLF_MAX_MIN_LENGHT; valTlfPattern = Constants.M_VAL_TLF_PATTERN;
  valEmailLength = Constants.M_VAL_EMAIL_MAX_LENGHT; valEmailPattern = Constants.M_VAL_EMAIL_PATTERN;
  valFechLengthMin = Constants.M_VAL_FECH_MIN_LENGHT; valFechLengthMax = Constants.M_VAL_FECH_MAX_LENGHT;
  valFechPattern = Constants.M_VAL_FECH_PATTERN;

  user: User = {
    idUser: Constants.CERO, dasId: Constants.VACIO, nameUser: Constants.VACIO, lastname1: Constants.VACIO, lastname2: Constants.VACIO,
    email: Constants.VACIO, birthDate: Constants.VACIO, phone: Constants.VACIO, document: Constants.VACIO, numSS: Constants.VACIO,
    status: Constants.CERO, deleted: false, roles: []
  };

  permited: Permission[];
  
  editBtn: boolean = false;
  createBtn: boolean = false;
  access: boolean = false;
  canUse: boolean = true;

  constructor(private navbarService: NavbarService, private usersService: UserService,
              private router: Router, private rolesService: RoleService,
              private activatedRoute: ActivatedRoute, private loginService: LoginService, 
              private authmanagerService: AuthmanagerService, private permissionService: PermissionService) { }

  changeUniqIdent(Value) {
    switch (Value) {
      case Constants.S_DNI:
        this.documento = Constants.UNO;
        break;
      case Constants.S_NIE:
        this.documento = Constants.DOS;
        break;
      case Constants.S_PASSPORT:
        this.documento = Constants.TRES;
        break;
    }
  }

  volver() {
    this.navbarService.returnBack();
  }

  checkDate(insert_date) {
    insert_date = new Date(insert_date).getTime();
    if (insert_date < new Date(Constants.FECHA_MINIMA)) {
      swal.fire(Constants.M_FECHA_INVALIDA_P1, Constants.M_FECHA_INVALIDA_MENOR_LIMITE_P2, Constants.ERROR);
      $(Constants.HTML_ID_INPUT_DATE).val(Constants.VACIO);
    }
  }

  changeDate(insert_date) {
    insert_date = new Date(insert_date).getTime();
    if (insert_date > this.limit_date) {
      swal.fire(Constants.M_FECHA_INVALIDA_P1, Constants.M_FECHA_INVALIDA_MAYOR_EDAD_P2, Constants.ERROR);
      $(Constants.HTML_ID_INPUT_DATE).val(Constants.VACIO);
    }
  }

  valDualList(): boolean {
    if (this.confirmed.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  saveNewUser() {
    if (this.valDualList()) {
      this.usersService.returnValidDas(this.user.dasId).subscribe(
        res => {
          console.log(res);
          if (res) {
            swal.fire(Constants.T_ERROR_ALERTA,
              'Das en uso ',
              Constants.WARNNING);
          } else {
            this.create();
          }
        });
    } else {
      this.ngOnInit();
      swal.fire(
        Constants.T_ERROR_ALERTA,
        Constants.M_ERROR_ROL_P2,
        Constants.WARNNING);
    }
  }

  create() {
    this.user.roles = this.confirmed;
    this.usersService.addUser(this.user).subscribe(
      user => {
        swal.fire(Constants.M_CREADO_USUARIO_P1, `${user.nameUser + Constants.M_CREADO_USUARIO_P2}`, Constants.SUCCESS);
        this.router.navigate([Constants.REDIREC_LIST_USUARIOS + Constants.CERO]);
      },
      err => {
        swal.fire(Constants.M_ERROR_CREACION_USUARIO_P1, Constants.M_ERROR_CREACION_USUARIO_P2, Constants.ERROR);
        console.error(Constants.LOG_FALLO);
      }
    );
  }

  updateUser() {
    if (this.valDualList()) {
      this.usersService.updateUser(this.user.idUser, this.user).subscribe(
        user => {
          swal.fire(Constants.M_EDITAR_USUARIO_P1, `${user.nameUser + Constants.M_EDITAR_USUARIO_P2}`, Constants.SUCCESS);
          this.router.navigate([Constants.REDIREC_LIST_USUARIOS + '0']);
        },
        err => {
          swal.fire(Constants.M_ERROR_EDITAR_USUARIO_P1, Constants.M_ERROR_EDITAR_USUARIO_P2, Constants.ERROR);
          console.log(Constants.LOG_FALLO);
        }
      );
    } else {
      this.ngOnInit();
      swal.fire(
        Constants.T_ERROR_ALERTA,
        Constants.M_ERROR_ROL_P2,
        Constants.WARNNING);
    }
  }

  elementsPermited(){
    this.permissionService.elementsPermited("User").subscribe(
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
      if(this.permited[p].id.element.identifier.includes("Edit")) {
        this.editBtn = this.permited[p].permited;
      }
      if(this.permited[p].id.element.identifier.includes("Create")) {
        this.createBtn = this.permited[p].permited;
      }
      if(this.permited[p].id.element.identifier.includes("lblUsers")) {
        this.access = this.permited[p].permited;
      }
    }
    this.permitedEditCreate();
  }

  permitedEditCreate(){
    if(this.isUpdating){
      if(!this.editBtn||!this.access){
        this.canUse = false;
      }
    }else{
      if(!this.createBtn||!this.access){
        this.canUse = false;
      }
    }
  }

  ngOnInit() {
    this.authmanagerService.checkAuth();
    this.navbarService.show();
    this.titulo = Constants.T_CREAR_USUARIO;
    this.rolesService.getRoles().subscribe(
      res => {
        this.allRoles = res;
        this.data = this.allRoles;
      },
      err => {
        console.log(Constants.LOG_FALLO);
      }
    );
    this.limit_date = (new Date()).getTime() - this.min_date;
    this.changeDate(this.insert_date);
    this.changeUniqIdent(this.Value);
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.sameUser = false;
      this.usersService.getUser(params.id).subscribe(
        res => {
          this.user = res;
          if (this.user.dasId == sessionStorage.getItem(Constants.S_USERNAME)) {

            this.sameUser = true;
          }
          this.data = this.allRoles;
          this.confirmed = this.user.roles;
          this.titulo = Constants.T_EDICION_USUARIO;
          this.isUpdating = true;
        },
        err => {
          swal.fire(Constants.M_ERROR_CARGA_UPDATE_P1, Constants.M_ERROR_CARGA_UPDATE_P2, Constants.ERROR);
          console.error(Constants.LOG_FALLO);
        }
      );
    }
    this.elementsPermited();
  }
}
