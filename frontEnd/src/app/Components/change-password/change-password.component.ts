import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/nav-bar/nav-bar.service';
import { UserService } from 'src/app/Services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/Models/login';
import swal from 'sweetalert2';
import { User } from 'src/app/Models/user';
import { ChangePassService } from 'src/app/Services/change-password/change-password.service';
import { Constants } from '../../Constants/constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  // CREACION DEL OBJETO LOGIN CON SUS ATRIBUTOS VACÍOS / CERO
  loginUser: Login = { idLogin: Constants.CERO, username: Constants.VACIO, password: Constants.VACIO, tries: Constants.CERO, enabled: true }

  // CREACION DEL OBJETO USER PARA TRABAJAR SOLO CON DOCUMENT.(PREGUNTAR A JAIME)
  userDoc: User = {
    idUser: Constants.CERO, dasId: Constants.VACIO, nameUser: Constants.VACIO, lastname1: Constants.VACIO, lastname2: Constants.VACIO,
    email: Constants.VACIO, birthDate: Constants.VACIO, phone: Constants.VACIO, document: Constants.VACIO, numSS: Constants.VACIO,
    status: Constants.CERO, deleted: false
  };
  // CREACION DEL OBJETO USER
  user: User = {
    idUser: Constants.CERO, dasId: Constants.VACIO, nameUser: Constants.VACIO, lastname1: Constants.VACIO,
    lastname2: Constants.VACIO, email: Constants.VACIO, birthDate: Constants.VACIO, phone: Constants.VACIO,
    document: Constants.VACIO, numSS: Constants.VACIO, status: Constants.PEND_ACTIVACION, deleted: false
  };

  // VARIABLES DE LOS INPUT DEL HTML
  pass1: string; pass2: string; documento; dni: string; Value = Constants.S_DNI; isPasswordActive = true;

  // VARIABLES DE LA SELECCION DE DNI, NIE O PASAPORTE
  opDni = Constants.S_DNI; opNie = Constants.S_NIE; opPassport = Constants.S_PASSPORT;

  // MENSAJES DE VALIDACION
  valRequired = Constants.M_VAL_REQUIRED; valDniPattern = Constants.M_VAL_DNI_PATTERN; valNiePattern = Constants.M_VAL_NIE_PATTERN;
  valPassportPattern = Constants.M_VAL_PASSPORT_PATTERN; valIdentificadorLenght = Constants.M_VAL_IDENTIFICADOR_MAX_MIN_LENGHT;

  // VARIABLES DE LOS LABEL DEL HTML
  titulo = Constants.T_CAMBIAR_CLAVE; l_unique_identifier = Constants.L_IDENTIFICADOR; l_dni = Constants.S_DNI;
  l_nie = Constants.S_NIE; l_pasaport = Constants.S_PASSPORT; l_password1 = Constants.L_CLAVE_1; l_password2 = Constants.L_CLAVE_2;
  l_CheckPass = Constants.L_MOSTRAR_CLAVE; btn_guarda = Constants.BTN_GUARDAR; valPassPattern = Constants.M_VAL_PASS_PATTERN;

  // CONSTRUCTOR
  constructor(private navbarService: NavbarService, private userService: UserService, private router: Router,
    private changePass: ChangePassService, private activatedRoute: ActivatedRoute) { }

  // ngOnInit  METODO QUE SE EJECUTA CADA VEZ QUE SE CARGA EL COMPONENTE
  ngOnInit() {
    this.navbarService.hide();
    this.changeUniqIdent(this.Value);
  }

  // METODO PARA MOSTRAR LA CONTRASEÑA EN HTML
  showMemberPassword() {
    if (this.isPasswordActive) {
      this.isPasswordActive = false;
    } else {
      this.isPasswordActive = true;
    }
  }

  // METODO PARA CAMBIAR DE DNI A NIE Y PASSPORT, CON SUS RESPECTIVAS VALIDACIONES
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

  /* ESTE MÉTODO COMPRUEBA QUE LA CONTRASEÑA COINCIDA EN LOS DOS INPUTS, QUE EN LA RUTA EXISTA UN ID Y UN DAS, QUE ESE
     ID Y ESE DAS SE CORRESPONDA AL MISMO USUARIO, CARGA EL USUARIO, QUE SU ESTADO SEA EL DE PENDIENTE DE ACTIVACION Y QUE
     QUE EL TIPO DE DOCUMENTO Y SU VALOR INTRODUCIDO SEA IGUAL AL DEL USUARIO. UNA VEZ COMPROBADO TODO ESO CREA EL REGISTRO DE
     ESE USUARIO EN LA TABLA LOGIN, PARA PODER ACCEDER AL APLICATIVO.
  */
  savePassUser() {
    if (this.pass1 === this.pass2) {
      const params = this.activatedRoute.snapshot.params;
      if (params.id && params.das) {
        this.userService.getUser(params.id).subscribe(
          res => {
            this.user = res;
            if (this.user != null) {
              if (this.user.status == Constants.PEND_ACTIVACION) {
                if (params.id == this.user.idUser && params.das == this.user.dasId && this.user.document.toUpperCase() ==
                this.userDoc.document.toUpperCase()) {
                  this.loginUser = { idLogin: params.id, username: params.das, password: this.pass1, tries: Constants.CERO, enabled: true }
                  this.changePass.addUser(this.loginUser).subscribe(
                    res => {
                      this.loginUser = res;
                      if (this.loginUser.enabled) {
                        swal.fire(`${Constants.M_CREADO_CLAVE_P1}`, `${this.loginUser.username +
                          Constants.M_CREADO_CLAVE_P2}`, Constants.SUCCESS);
                        sessionStorage.clear();
                        this.router.navigate([Constants.REDIREC_LOGIN]);
                      } else {
                        swal.fire(`${Constants.M_FALLO_CREA_USUARIO_P1}`, `${Constants.M_FALLO_CREA_USUARIO_P2}`, Constants.ERROR)
                      }
                    }
                  );
                } else {
                  swal.fire(`${Constants.M_FALLO_CREDENCIALES_P1}`, `${Constants.M_FALLO_CREDENCIALES_P2}`, Constants.ERROR);
                }
              } else {
                swal.fire(`${Constants.M_FALLO_STATUS_P1}`, `${Constants.M_FALLO_STATUS_P2}`, Constants.ERROR);
              }
            } else {
              swal.fire(`${Constants.M_FALLO_DATOS_P1}`, `${Constants.M_FALLO_DATOS_P1}`, Constants.ERROR);
            }
          }
        );
      }
    } else {
      swal.fire(`${Constants.M_FALLO_CONTRASEÑA_INVALIDA_P1}`, `${Constants.M_FALLO_CONTRASEÑA_INVALIDA_P2}`, Constants.ERROR);
    }
  }
}
