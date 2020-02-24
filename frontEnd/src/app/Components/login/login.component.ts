import { Component, OnInit } from '@angular/core';
//import { NavbarService } from 'src/app/Services/nav-bar/nav-bar.service';
import { LoginService } from 'src/app/Services/login/login.service';
import { Login } from 'src/app/Models/login';
import { Router } from '@angular/router';
import { Constants } from '../../Constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isPasswordActive = true; userLogin: string; passLogin: string; attempts = Constants.CERO; icon = Constants.ICON;

  login: Login = {
    idLogin: Constants.CERO, username: Constants.VACIO, password: Constants.VACIO,
    tries: Constants.CERO, enabled: true
  };

  loginUpdated: Login;

  blocked: boolean;
  //HTML
  lerror = Constants.M_ERROR_LOGIN; lUsuario = Constants.L_USUARIO; lClave = Constants.L_CLAVE; cbMostrar = Constants.L_MOSTRAR_CLAVE; btnAcceder = Constants.BTN_ACCEDER;
  //Validaciones
  valRequired = Constants.M_VAL_REQUIRED; valDasPattern = Constants.M_VAL_DAS_PATTERN; lblocked = Constants.M_BLOCKED_LOGIN;
  constructor(/*private navbarService: NavbarService,*/ private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    LoginService.load = 0;
    /*this.navbarService.hide();*/
    this.blocked = false;
  }

  checkLogin() {
    this.login.username = this.userLogin
    this.login.password = this.passLogin
    if (this.passLogin != null) {
      this.loginService.loginCredentials(this.login).subscribe(
        res => {
          if (res === true) {
            sessionStorage.setItem(Constants.S_USERNAME, this.login.username);
            sessionStorage.setItem(Constants.S_PASSWORD, btoa(this.login.password));
            this.router.navigate([Constants.REDIREC_HOME]);
            this.attempts = Constants.CERO;
          }
          if (res === false) {
            this.attempts = this.attempts + Constants.UNO;
            this.loginService.addAttempt(this.login).subscribe(
              res => {
                this.loginUpdated = res;
                if (this.loginUpdated.tries >= Constants.TRES) {
                  this.attempts = Constants.CERO;
                  this.blocked = true;
                }
              }
            );
          }
        },
        err => {
          this.attempts = this.attempts + Constants.UNO;
          this.loginService.addAttempt(this.login).subscribe();
          this.loginService.checkStatus(this.login).subscribe(
            res => {
              this.loginUpdated = res;
              if (this.loginUpdated.tries >= Constants.TRES) {
                this.attempts = Constants.CERO;
                this.blocked = true;
              }
            }
          );
        }
      )
    }
  }

  showMemberPassword() {
    if (this.isPasswordActive) {
      this.isPasswordActive = false;
    } else {
      this.isPasswordActive = true;
    }
  }
}
