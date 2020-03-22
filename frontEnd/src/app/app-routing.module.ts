import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { RoleListComponent } from './Components/role-list/role-list.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { SkillsListComponent } from './Components/skills-list/skills-list.component';
import { CourseListComponent } from './Components/course-list/course-list.component';
import { PerfilComponent } from './Components/perfil/perfil.component';
import { FormUserComponent } from './Components/form-user/form-user.component';
import { Found404Component } from './Components/found404/found404.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { FormCourseComponent } from './Components/form-course/form-course.component';
import { FormPermissionComponent } from './Components/form-permission/form-permission.component';
import { FormRoleComponent } from './Components/form-role/form-role.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'formUser',
    component: FormUserComponent,
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'listRole/page/:page',
    component: RoleListComponent
  },
  {
    path: 'listUser/page/:page',
    component: UserListComponent
  },
  {
    path: 'listSkill/page/:page',
    component: SkillsListComponent
  },
  {
    path: 'listSkill/:id',
    component: SkillsListComponent
  },
  {
    path: 'formRole',
    component: FormRoleComponent
  },
  {
    path: 'changePassword/:id/:das',
    component: ChangePasswordComponent
  },
  {
    path: 'formUser/:id',
    component: FormUserComponent
  },
  {
    path: 'listRole/:id',
    component: FormRoleComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'listCourse/page/:page',
    component: CourseListComponent
  },
  {
    path: 'formCourse',
    component: FormCourseComponent
  },
  {
    path: 'formPermission/:id',
    component: FormPermissionComponent
  },
  {
    path: 'formCourse/:id',
    component: FormCourseComponent
  },
  {
    path: 'profile',
    component: PerfilComponent
  },
  {
    path: '**',
    component: Found404Component
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
