import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../Services/nav-bar/nav-bar.service';
import { LoginService } from '../../Services/login/login.service';
import { Constants } from '../../Constants/constants';
import { AuthmanagerService } from '../../Services/authmanager/authmanager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private navbar: NavbarService, private authmanagerService: AuthmanagerService) { }

  imagenBanner = Constants.IMGBANNER; titulo = Constants.T_HOME; copyright = Constants.S_COPYRIGHT; titDescripcion = Constants.TIT_DESCRIPCION; descripcion = Constants.DESCRIPCION;
  imgBanner2 = Constants.IMGBANNER2; imgBanner3 = Constants.IMGBANNER3; imgBanner4 = Constants.IMGBANNER4;

  ngOnInit() {
    this.authmanagerService.checkAuth();
    if (LoginService.load == Constants.CERO) {
      LoginService.load = Constants.UNO;
      window.location.reload();
    }
    this.navbar.show();
  }
}
