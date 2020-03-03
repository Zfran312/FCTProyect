import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/nav-bar/nav-bar.service';
import { UserService } from 'src/app/Services/user/user.service';
import { User } from 'src/app/Models/user';
import { Constants } from '../../Constants/constants';
import swal from 'sweetalert2';
import { Login } from 'src/app/Models/login';
import { Router } from '@angular/router';
import { ChangePassService } from 'src/app/Services/change-password/change-password.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  [x: string]: any;
  user: User = {
    idUser: Constants.CERO, dasId: Constants.VACIO, nameUser: Constants.VACIO, lastname1: Constants.VACIO, lastname2: Constants.VACIO, email: Constants.VACIO,
    birthDate: Constants.VACIO, phone: Constants.VACIO, document: Constants.VACIO, numSS: Constants.VACIO, status: Constants.CERO, deleted: false, roles: []
  };
  userChange: User = {
    idUser: Constants.CERO, dasId: Constants.VACIO, nameUser: Constants.VACIO, lastname1: Constants.VACIO, lastname2: Constants.VACIO, email: Constants.VACIO,
    birthDate: Constants.VACIO, phone: Constants.VACIO, document: Constants.VACIO, numSS: Constants.VACIO, status: Constants.CERO, deleted: false, roles: []
  };
  habilitar = false; titCambio = Constants.S_SALUDO_CAMBIO_PASSWORD; cuerpoCambio =Constants.S_TEXT_CAMBIO_PASSWORD; cambioPass = Constants.T_CAMBIO_PASSWORD;
  l_password1 = Constants.L_CLAVE_1; l_password2 = Constants.L_CLAVE_2; valRequired= Constants.M_VAL_REQUIRED; valPassPattern = Constants.M_VAL_PASS_PATTERN;
  pass1; pass2; l_CheckPass = Constants.L_MOSTRAR_CLAVE; isPasswordActive = true; loginUser: Login; visible: boolean = false;
  constructor(private navbar: NavbarService, private serviceUser: UserService, private changePass: ChangePassService, private router: Router) { }

  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ? false : true;
    this.isPasswordActive = true;
  }

  changePassword(){
    if (this.pass1 === this.pass2) {
      this.loginUser = { idLogin: this.user.idUser, username: this.user.dasId, password: this.pass1, tries: Constants.CERO, enabled: true }
      this.changePass.modify(this.loginUser).subscribe(
        res => {
          this.loginUser = res;
          if (this.loginUser.enabled) {
            swal.fire(`${Constants.M_CREADO_CLAVE_P1}`, `${this.loginUser.username + Constants.M_CREADO_CLAVE_P2}`, Constants.SUCCESS)
            sessionStorage.clear();
            this.router.navigate([Constants.REDIREC_LOGIN]);
          } else {
            swal.fire(`${Constants.M_FALLO_CREA_USUARIO_P1}`, `${Constants.M_FALLO_CREA_USUARIO_P2}`, Constants.ERROR)
          }
        }
      );
    } else {
      swal.fire(`${Constants.M_FALLO_CONTRASEÑA_INVALIDA_P1}`, `${Constants.M_FALLO_CONTRASEÑA_INVALIDA_P2}`, Constants.ERROR);
    }
  }
  
  showMemberPassword() {
    if (this.isPasswordActive) {
      this.isPasswordActive = false;
    } else {
      this.isPasswordActive = true;
    }
  }

  ngOnInit() {
    this.serviceUser.filterByDasId(sessionStorage.getItem(Constants.S_USERNAME)).subscribe(
      res=> {
        this.user = res;      
        this.visible = true;  
      },
      err=> console.log(Constants.LOG_FALLO)
    );
    this.navbar.show();
  }

}
