import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/Services/permission/permission.service';
import { Constants } from '../../Constants/constants';
import swal from 'sweetalert2';
import { NavbarService } from '../../Services/nav-bar/nav-bar.service';

@Component({
  selector: 'app-form-permission',
  templateUrl: './form-permission.component.html',
  styleUrls: ['./form-permission.component.css']
})
export class FormPermissionComponent implements OnInit {

  add = Constants.ADD_PERMISSIONS;
  textElements = Constants.ELEMENTS_TEXT_PERMISSIONS;
  addTitle = Constants.ADD_PERMISSIONS_TITLE;

  formato = Constants.FORMATO;
  data;
  confirmed = [];
  elements: String;

  constructor(private navbarService: NavbarService, private router: Router, private permissionService: PermissionService) { }

  ngOnInit() {
    this.navbarService.show();
    this.loadElements();
  }


  loadElements(){
    this.permissionService.getElements().subscribe(
      res => {
        this.data = res;
      },
      err => {
        console.log(err)
      }
    );
  }

  savePermissions(){
    this.permissionService.addPermissions(this.confirmed).subscribe(
      res =>{
        swal.fire(Constants.SUCCESS_PERMISSIONS_TITLE, Constants.SUCCESS_PERMISSIONS_MESSAGE + this.permissionService.getRole().name, Constants.SUCCESS);
        this.router.navigate([Constants.REDIREC_LIST_ROLES + Constants.CERO]);
      },
      err =>{
        console.log(err);
      }
    );
  }

}
