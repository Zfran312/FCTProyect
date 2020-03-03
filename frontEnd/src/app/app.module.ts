import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule, NavbarService } from 'angular-bootstrap-md';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularDualListBoxModule } from 'angular-dual-listbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { RoleListComponent } from './Components/role-list/role-list.component';
import { SkillsListComponent } from './Components/skills-list/skills-list.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { CourseListComponent } from './Components/course-list/course-list.component';
import { CoursePaginatorComponent } from './Components/paginators/course-paginator/course-paginator.component';
import { PermissionPaginatorComponent } from './Components/paginators/permission-paginator/permission-paginator.component';
import { RolePaginatorComponent } from './Components/paginators/role-paginator/role-paginator.component';
import { SkillPaginatorComponent } from './Components/paginators/skill-paginator/skill-paginator.component';
import { UserPaginatorComponent } from './Components/paginators/user-paginator/user-paginator.component';
import { Found403Component } from './Components/found403/found403.component';
import { FormUserComponent } from './Components/form-user/form-user.component';
import { UserService } from './Services/user/user.service';
import { RoleService } from './Services/role/role.service';
import { SkillService } from './Services/skill/skill.service';
import { LoginService } from './Services/login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    HomeComponent,
    PerfilComponent,
    RoleListComponent,
    SkillsListComponent,
    UserListComponent,
    CourseListComponent,
    CoursePaginatorComponent,
    PermissionPaginatorComponent,
    RolePaginatorComponent,
    SkillPaginatorComponent,
    UserPaginatorComponent,
    Found403Component,
    FormUserComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AngularDualListBoxModule,
    FormsModule,
    NgxPaginationModule,
    AppRoutingModule
  ],
  providers: [NavbarService, UserService, RoleService, SkillService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
