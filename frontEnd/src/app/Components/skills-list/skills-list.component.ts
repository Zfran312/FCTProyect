import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/Services/nav-bar/nav-bar.service';
import { SkillService } from 'src/app/Services/skill/skill.service';
import { Skill } from 'src/app/Models/skill';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Constants } from '../../Constants/constants';
import { AuthmanagerService } from '../../Services/authmanager/authmanager.service';
import { LoginService } from 'src/app/Services/login/login.service';
import { Permission } from 'src/app/Models/permission';
import { PermissionService } from 'src/app/Services/permission/permission.service';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.css']
})
export class SkillsListComponent implements OnInit {

  page = Constants.PAGE; pageSize = Constants.PAGESIZE; nombre: string = Constants.VACIO; habilitar: boolean = false; btnhabilitarFiltros: boolean = false;
  isUpdating = false; skills: any = []; ordenBoolean = false; campoOrdenar = Constants.S_PARAM_ORDER_DEFAULT_SKILL; orden = Constants.S_ASC; habilitarFiltro = false;
  opcion = Constants.S_PARAM_ORDER_DEFAULT_SKILL;
  
  //HTML
  titulo = Constants.T_LIST_SKILL; lCreacion = Constants.BTN_CRACION_SKILL; lnombreSkill = Constants.L_NOMBRE_SKILL;
  btnBuscar = Constants.BTN_BUSCAR; btnReset = Constants.BTN_RESET_FILTRO; colNombre = Constants.COL_NOMBRE; colEdit = Constants.COL_EDIT;
  colElim = Constants.COL_ELIMINAR; btnEliminar = Constants.BTN_ELIM; btnFiltro = Constants.BTN_FILTRO_SKILL;

  skill: Skill = { idSkill: Constants.CERO, name: Constants.VACIO };

  permited: Permission[];

  editBtn: boolean = false;
  createBtn: boolean = false;
  deleteBtn: boolean = false;
  access: boolean = true;
  visible: boolean = false;
  resetFilter: boolean = false;

  paginator: any;

  constructor(private navbarService: NavbarService, private skillService: SkillService,
              private router: Router, private activatedRoute: ActivatedRoute, private loginService: LoginService,
              private authmanagerService: AuthmanagerService, private permissionService: PermissionService) { }

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
    this.router.navigate([Constants.REDIREC_LIST_SKILL + this.page]);
    this.response();
  }

  setHabilitar(): void {
    this.habilitar = (this.habilitar === true) ? false : true;
  }

  setHabilitarFiltros(): void {
    this.btnhabilitarFiltros = (this.btnhabilitarFiltros === true) ? false : true;
  }

  filterByRoleName(term: string) {
    if (!this.habilitarFiltro) {
      this.page = Constants.CERO;
      this.router.navigate([Constants.REDIREC_LIST_SKILL + this.page])
    }
    if(!this.resetFilter){
      this.campoOrdenar = Constants.S_PARAM_ORDER_DEFAULT_SKILL;
      this.orden = Constants.S_ASC;
    }
    this.resetFilter = true;
    this.btnhabilitarFiltros= false;
    this.habilitarFiltro = true;
    this.skillService.filterBySkillNamePage(term, this.page, this.campoOrdenar, this.orden).subscribe(
      res => {
        this.skills = res.content as Skill[];
        this.paginator = res;
      },
      err => {
        swal.fire(Constants.M_ERROR_FILTRO_SKILL_P1, Constants.M_ERROR_FILTRO_SKILL_P2, Constants.ERROR),
          console.log(err);
      }
    );
  }

  response() {
    if (this.habilitarFiltro == false) {
      this.skillService.getSkillsPage(this.page, this.campoOrdenar, this.orden).subscribe(
        res => {
          this.skills = res.content as Skill[];
          this.paginator = res;
          this.elementsPermited();
        },
        err => console.log(Constants.LOG_FALLO)
      );
    } else {
      this.filterByRoleName(this.skill.name);
    }
  }

  saveNewSkill() {
    delete this.skill.idSkill;
    this.skillService.addSkill(this.skill).subscribe(
      skill => {
        swal.fire(Constants.M_CREADO_SKILL_P1, `${skill.name + Constants.M_CREADO_SKILL_P2}`, Constants.SUCCESS);
        this.ngOnInit();
      },
      err => {
        swal.fire(Constants.M_ERROR_CREADO_SKILL_P1, Constants.M_ERROR_CREADO_SKILL_P2, Constants.ERROR);
        console.error(err);
      }
    );
  }

  updateSkill() {
    this.skillService.updateSkill(this.skill.idSkill, this.skill).subscribe(
      skill => {
        swal.fire(Constants.M_EDITAR_SKILL_P1, `${this.skill.name + Constants.M_EDITAR_SKILL_P2}`, Constants.SUCCESS);
        this.ngOnInit();
        this.router.navigate([Constants.REDIREC_LIST_SKILL + '0']);
      },
      err => {
        swal.fire(Constants.M_ERROR_EDITAR_SKILL_P1, Constants.M_ERROR_EDITAR_SKILL_P2, Constants.ERROR);
        console.log(err);
      }
    );
  }

  delete(skill: Skill): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: Constants.BTN_ST_SUCCESS,
        cancelButton: Constants.BTN_ST_DANGER
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `¿ Seguro que desea borrar la Habilidad ${skill.name}?`,
      icon: Constants.WARNNING,
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.skillService.delete(skill.idSkill).subscribe(
          response => {
            this.skills = this.skills.filter(cli => cli !== skill);
            swalWithBootstrapButtons.fire(
              `Eliminado! ${skill.idSkill}`,
              `Habilidad ${skill.name} eliminado con éxito.`,
              Constants.SUCCESS
            );
            this.response();
          },
          err => {
            swal.fire(`${Constants.M_ERROR_SKILLS_TITLE}`, `${Constants.M_ERROR_SKILL_WITH_COURSE}`, Constants.ERROR);
          }
        );
      }
    });
  }

  elementsPermited() {
    this.permissionService.elementsPermited("Skill").subscribe(
      res => {
        this.permited = res as Permission[];
        this.checkPermission();
        this.visible = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  cleanFilter() {
    this.skill.name = Constants.VACIO;
    this.habilitarFiltro = false;
    this.page = Constants.CERO;
    this.resetFilter = false;
    this.btnhabilitarFiltros = false;
    this.router.navigate([Constants.REDIREC_LIST_SKILL + this.page])
    this.response();
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

  ngOnInit() {
    this.authmanagerService.checkAuth();
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.page = +params.get(Constants.S_PAGE);
        if (!this.page) {
          this.page = Constants.CERO;
        }
        this.navbarService.show();
        this.isUpdating = false;
        this.habilitar = false;
        const parametros = this.activatedRoute.snapshot.params;
        if (parametros.id) { // XBS 15/07/2019 Al usar el mismo form para guardar que para editar, si recibe un id, estoy editando
          this.skillService.getSkill(parametros.id).subscribe(
            res => {
              this.habilitar = true;
              this.skill = res;
              this.isUpdating = true; // XBS 15/07/2019 Marca la acción como update, que lee el formulario
            },
            err => {
              swal.fire(Constants.M_ERROR_CARGA_UPDATE_P1, Constants.M_ERROR_CARGA_UPDATE_P2, Constants.ERROR);
              console.error(err);
            }
          );
        }
        this.response();
      }
    );
  }
}
