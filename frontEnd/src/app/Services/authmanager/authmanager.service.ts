import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/Constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthmanagerService {

  constructor(private router: Router) { }

  checkAuth() {
    // Comprueba que hay un usuario cada vez que navegamos entre paginas.
    if (!sessionStorage.getItem(Constants.S_USERNAME) && (!sessionStorage.getItem(Constants.S_PASSWORD))) {
      this.router.navigate([Constants.REDIREC_LOGIN]);
    }
  }
}
