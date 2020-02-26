import { SweetAlertType } from 'sweetalert2';
import { DualListComponent } from 'angular-dual-listbox';
import { User } from '../Models/user';
import { Role } from '../Models/role';
import { Login } from '../Models/login';

export class Constants {
    //General
    public static S_USERNAME = 'username';
    public static S_PASSWORD = 'pass';
    public static S_M_USUARIO = 'Usuario';
    public static S_M_ROLES = 'Roles';
    public static S_M_CURSOS = 'Cursos';
    public static S_M_HABILIDADES = 'Habilidades';
    public static S_M_PERFIL = 'Perfil';
    public static SALTO_LINEA = '\n ';
    public static S_COMA = ',';
    public static S_ESPACIO = ' ';
    public static S_SI = 'Si';
    public static S_NO = 'No';
    public static S_NULL = 'null';
    public static NULL = null;

    //General Page
    public static S_PAGE = 'page';
    public static S_PARAM_ORDER_DEFAULT_USER = 'dasId';
    public static S_PARAM_ORDER_DEFAULT_COURSE = 'nameCourse';
    public static S_PARAM_ORDER_DEFAULT_SKILL = 'name';
    public static S_PARAM_ORDER_DEFAULT_ROL = 'name';
    public static S_ASC = 'asc';
    public static S_DESC = 'desc';

    //General Form
    public static L_NOMBRE = 'Nombre:';
    public static M_ERROR_FILTRO_ANIDADO = 'No se pudo completar el filtrado';
    public static L_DESCRIPCION = 'Descripción:';
    public static L_IDENTIFICADOR = 'Identificador:';
    public static M_ERROR_CARGA_UPDATE_P1 = ' Uppps ';
    public static M_ERROR_CARGA_UPDATE_P2 = ' Lo sentimos pero no se ha podido realizar la petición de modificación. ';
    public static T_ERROR_ALERTA = 'ALERTA !';
    public static T_DONACION = 'Ayudanos a mantener la página';
    public static HTML_DONACION = `<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_blank">
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value="EYUGXKLRB4Q66" />
      <input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Botón Donar con PayPal" />
      <img alt="" border="0" src="https://www.sandbox.paypal.com/es_ES/i/scr/pixel.gif" width="1" height="1" />
      </form>`;

    //Botonos y estilo de botones
    public static BTN_GUARDAR = 'Guardar';
    public static BTN_ST_SUCCESS = 'btn btn-success';
    public static BTN_ST_DANGER = 'btn btn-danger';
    public static BTN_RESET_FILTRO = 'Resetear Filtros';
    public static BTN_ENVIAR = 'Enviar';
    public static BTN_BUSCAR = 'Buscar';
    public static BTN_VOLVER = 'Volver';

    //perfil
    public static S_SALUDO_CAMBIO_PASSWORD = 'Hola ';
    public static S_TEXT_CAMBIO_PASSWORD = 'Aquí puedes cambiar tu contraseña.';
    public static T_CAMBIO_PASSWORD = 'Cambio contraseña';

    //Paginable
    public static PAGE : number = 1;
    public static PAGESIZE: number = 4;

    //Numericos y Vacio
    public static VACIO = '';
    public static MAX_HORAS = 999;
    public static CERO = 0;
    public static UNO = 1;
    public static DOS = 2;
    public static TRES = 3;

    //Estados Usuarios
    public static PEND_ACTIVACION = 0;
    public static ACTIVADO = 1;
    public static NO_ACTIVADO = 2;
    public static BLOQUEADO = 3;

    //Objetos default
    public static USER_DAFAULT: User = {
      idUser: Constants.CERO, dasId: Constants.VACIO, nameUser: Constants.VACIO, lastname1: Constants.VACIO, lastname2: Constants.VACIO, email: Constants.VACIO,
      birthDate: Constants.VACIO, phone: Constants.VACIO, document: Constants.VACIO, numSS: Constants.VACIO, status: Constants.CERO, deleted: false, roles: []
    };

    public static ROLE_DEFAULT: Role = { idRole: Constants.CERO, description: Constants.VACIO, name : Constants.VACIO};

    public static LOGIN_DEFAULT: Login = { idLogin: Constants.CERO, username: Constants.VACIO, password: Constants.VACIO, tries: Constants.CERO, enabled: true};

    //Estado Swal
    public static SUCCESS: SweetAlertType = 'success';
    public static ERROR: SweetAlertType = 'error';
    public static WARNNING: SweetAlertType = 'warning';
    public static INFO: SweetAlertType = 'info';

    //Generales RUTAS NO MODIFICAR
    public static API_URI = 'http://localhost:8080/api/';
    public static S_COURSE = 'courses';
    public static S_COURSE_PAGE = 'courses/page/';
    public static S_SKILL = 'skills';
    public static S_SKILL_PAGE = 'skills/page/';
    public static S_ROLES = 'roles';
    public static S_ROLE_PAGE = 'roles/page/';
    public static S_USER = 'users';
    public static S_USER_PAGE = 'users/page/';
    public static S_USERLIST = 'usersList';
    public static S_LOGIN = 'login';
    public static ROUTE_FILTER_GENERAL = 'filterbynested/';
    public static ROUTE_BAR = '/';
    public static ROUTE_DOUBLEBAR = '//';
    public static ROUTE_DIR_BAR = '\\';
    public static ROUTE_DIR_DOUBLEBAR = '\\\\';

    //Service Login
    public static LOGIN_ATTEMPTS = 'login/addattempt';
    public static LOGIN_USER_STATUS = 'login/checkstatus';

    //service Change service
    public static SAVE_USERLOGIN = 'saveUserlogin';
    public static MODIFY_USERLOGIN = 'modifyUserlogin';

    //Service Course
    public static ROUTE_COURSE = 'courses/';
    public static M_ERROR_FILTER_HORA = 'El valor mínimo no puede ser mayor que el máximo.';

    //Service Roles
    public static ROUTE_ROL = 'roles/';
    public static ROUTE_ROL_LIST_USER = 'userslist/';
    public static ROUTE_FILTER_ROLE_NAME = 'filterbyrolename/';
    public static ROUTE_FILTER_ROLE_PAGE = '/page/';
    public static ROUTE_LIST_USER_BY_ROLE = 'usersbyrole/';

    //Service Skill
    public static ROUTE_SKILL = 'skills/';
    public static ROUTE_FILTER_SKILL_NAME = 'filterbyskillname/';

    //Service User
    public static ROUTE_USER = 'users/';
    public static ROUTE_FILTER_USER_DAS = 'filterbydasid/';
    public static ROUTE_VALID_DAS = 'dasvalid/';

    //Generes Formularios
    public static S_DNI = 'DNI';
    public static S_NIE = 'NIE';
    public static S_PASSPORT = 'PASAPORTE';

    //Change-PassWord TS
    public static M_CREADO_CLAVE_P1 = 'Usuario verificado ';
    public static M_CREADO_CLAVE_P2 = ' Verificado con éxito ';
    public static M_FALLO_CREA_USUARIO_P1 = 'Error al crear usuario ';
    public static M_FALLO_CREA_USUARIO_P2 = 'Lo sentimos, parece que ha habido un error al crear su usuario';
    public static M_FALLO_CREDENCIALES_P1 = 'Credenciales no válidas ';
    public static M_FALLO_CREDENCIALES_P2 = 'Revise que el documento sea correcto y que las contraseñas coincidan';
    public static M_FALLO_DATOS_P1 = 'Error en los datos ';
    public static M_FALLO_DATOS_P2 = 'Pruebe a volver a entra a la página desde el link, si el error persiste contacte' +
                                      ' con el administrador.';
    public static M_FALLO_CONTRASEÑA_INVALIDA_P1 = 'Contraseña no válida ';
    public static M_FALLO_CONTRASEÑA_INVALIDA_P2 = 'Las contraseñas deben coincidir';
    public static M_FALLO_STATUS_P1 = ' Error en la activación ';
    public static M_FALLO_STATUS_P2 = ' El usuario que está intentando activar ya está activado ';

    //Change-PassWord HTML
    public static T_CAMBIAR_CLAVE = 'Cambiar Contraseña';
    public static L_CLAVE_1 = 'Nueva Contraseña:';
    public static L_CLAVE_2 = 'Confirma contraseña:';
    public static L_MOSTRAR_CLAVE = 'Mostrar Contraseñas';
    public static M_VAL_PASS_PATTERN = 'No sigue el patron, tiene que tener minimo 8 caracteres "Mayusculas, minusculas, numero"';

    //Course-List TS
    public static LOG_FALLO = 'Fallaste';
    public static M_FALLO_BUSQ_CURSO_P1 = ' Uppps ';
    public static M_FALLO_BUSQ_CURSO_P2 = ' Lo sentimos pero no podemos hacer el filtro por Nombre. ';
    public static M_LISTA_SKILLS = ' Esta es la lista de Habilidades: ';
    public static VERDESC_P1: SweetAlertType = 'info';
    public static VERDESC_P2 = 'Descripción del curso';

    //Course-List HTML
    public static L_MIN_HORAS = 'Horas mínimas:';
    public static L_MAX_HORAS = 'Horas máximas:';
    public static T_LISTAR_CURSOS = 'LISTAR CURSOS';
    public static BTN_CREAR_CURSO = 'Crear Curso';
    public static BTN_FILTRO_CURSO = 'Filtrado de curso';
    public static L_NOMBRE_CURSO = 'Nombre Curso:';
    public static COL_NOMBRE = 'NOMBRE';
    public static COL_NHORAS = 'NºHORAS';
    public static COL_TEMATICA = 'TEMATICA';
    public static COL_NIVEL = 'NIVEL';
    public static COL_PUBLICADO = 'PUBLICADO';
    public static COL_DESCRIP = 'DESCRIPCIÓN';
    public static COL_SKILL = 'HABILIDADES';
    public static COL_FTP = 'FTP';
    public static COL_EDIT = 'EDITAR';
    public static COL_ELIMINAR = 'ELIMINAR';
    public static BTN_ELIM = 'Eliminar';
    public static BTN_EDITAR = 'Editar';
    public static BTN_DESCAR_CURSO = 'Descargar';
    public static BTN_VER_CURSO = 'Ver';

    //FORM-COURSE TS
    public static T_CREACION_CURSO = 'Crear Curso';
    public static T_EDICION_CURSO = 'Modificar Curso';
    public static NIVEL_DEFECTO_CURSO = '3';
    public static REDIREC_LIST_CURSO = '/listCourse/page/';
    public static FORMATO = { add: 'Añadir', remove: 'Borrar', all: 'Todos', none: 'Ninguno',
                             direction: DualListComponent.LTR, draggable: true, locale: 'es' };
    public static M_ERROR_COURSE_P2 = 'Necesitas tener mínimo un habilidad.';

    //FORM-COURSE HTML
    public static L_HORAS = 'Inversión Horas:';
    public static L_TEMATICA = 'Tematica:';
    public static L_NIVEL = 'Nivel:';
    public static NIVEL_BAJO = 'Bajo';
    public static NIVEL_MEDIO = 'Medio';
    public static NIVEL_ALTO = 'Alto';
    public static L_PUBLICADO = 'Publicado:';
    public static L_FTP = 'Archivo Curso:';
    public static L_SKILL = 'Habilidades: ';
    public static M_VAL_TEMATICA_CURSO_PATTERN = 'En el campo tematica no se permiten caracteres especiales ni números';
    public static M_VAL_HORAS_CURSO_PATTERN = 'El número no sigue el patron debe estar comprendido entre 1 - 999';

    //FORM-ROLE TS
    public static M_EDITAR_ROL_P1 = ' Rol actualizado ';
    public static T_EDICION_ROL = 'Modificar Rol';
    public static M_EDITAR_ROL_P2 = ' actualizado en la base de datos. ';
    public static REDIREC_LIST_ROLES = '/listRole/page/';
    public static REDIREC_SET_PERMISSIONS = '/formPermission/';
    public static M_ERROR_UPDATE_P1 = ' Uppps ';
    public static M_ERROR_UPDATE_P2 = ' Lo sentimos pero no se ha podido realizar la petición de actualización. ';
    public static M_CREADO_ROL_P1 = ' Rol creado ';
    public static M_CREADO_ROL_P2 = ' insertado en la base de datos ';
    public static M_ERROR_CREACION_ROL_P1 = ' Uppps ';
    public static M_ERROR_CREACION_ROL_P2 = ' Lo sentimos pero no se ha podido realizar la petición de creación. ';

    //FORM-ROLE HTML
    public static T_CREACION_ROL = 'Crear Roles';
    public static M_VAL_NOMBRE_ROL_PATTERN = 'Tienes que introducir un nombre de 15 carcteres, sin caracteres especiales';
    public static M_VAL_DESCRIP_ROL_PATTERN = 'Tienes que introducir una descripción de 40 carcteres solo se permiten solo los' +
                                              ' siguientes caracteres especiales ". , ;".';

    //FORM-USER TS
    public static FECHA_MINIMA = '1900-01-01';
    public static M_FECHA_INVALIDA_P1 = ' Fecha invalida ';
    public static M_FECHA_INVALIDA_MAYOR_EDAD_P2 = ' FECHA NO VALIDA!! Debes tener más de 18 años para entrar en este aplicativo';
    public static M_FECHA_INVALIDA_MENOR_LIMITE_P2 = ' FECHA NO VALIDA!! No se aceptan fechas inferiores al 01/01/1900 ';
    public static HTML_ID_INPUT_DATE = '#date';
    public static T_CREAR_USUARIO = 'Crear Usuario';
    public static T_EDICION_USUARIO = 'Modificar Usuario';
    public static M_CREADO_USUARIO_P1 = ' Usuario creado ';
    public static M_CREADO_USUARIO_P2 = ' insertado en la base de datos ';
    public static M_ERROR_CREACION_USUARIO_P1 = ' Uppps ';
    public static M_ERROR_CREACION_USUARIO_P2 = ' Lo sentimos pero no se ha podido realizar la petición de creación. ';
    public static M_EDITAR_USUARIO_P1 = ' Usuario actualizado ';
    public static M_EDITAR_USUARIO_P2 = ' actualizado en la base de datos ';
    public static M_ERROR_EDITAR_USUARIO_P1 = ' Uppps ';
    public static M_ERROR_EDITAR_USUARIO_P2 = ' Lo sentimos pero no se ha podido realizar la petición de actualización. ';
    public static REDIREC_LIST_USUARIOS = '/listUser/page/';
    public static L_DAS = 'DAS:';
    public static L_SS = 'Número SS:';
    public static L_APELLIDO1 = 'Apellido 1:';
    public static L_APELLIDO2 = 'Apellido 2:';
    public static L_TELEFONO = 'Telefono:';
    public static L_EMAIL = 'Email:';
    public static L_FECH = 'Fecha nacimiento:';
    public static L_ROLES = 'Roles:';
    public static REDIREC_FORM_USUARIOS = 'formUser';
    public static M_ERROR_ROL_P2 = 'Necesitas tener mínimo un rol.';

    //FORM-USER HTML
    public static M_VAL_REQUIRED = 'El campo es obligatorio.';
    public static M_VAL_DAS_MAX_MIN_LENGHT = 'El campo das debe contener 7 caracteres.';
    public static M_VAL_DAS_PATTERN = 'El campo das debe cumplir este patrón: 1 letra mayúscula seguida de 6 números';
    public static M_VAL_IDENTIFICADOR_MAX_MIN_LENGHT = 'El campo identificador debe contener 9 caracteres.';
    public static M_VAL_DNI_PATTERN = 'El campo DNI debe cumplir este patrón: 8 números seguida de una letra mayúscula';
    public static M_VAL_NIE_PATTERN = 'El campo NIE debe cumplir este patrón: 1 letra mayúscula de las siguientes [X,Y,Z]' +
                                      ' seguida de 7 números y 1 letra letra mayúscula cualquiera';
    public static M_VAL_PASSPORT_PATTERN = 'El campo pasaporte debe cumplir este patrón: 3 letras mayúsculas seguida de 6 números';
    public static M_VAL_SS_MAX_MIN_LENGHT = 'El campo nº SS debe contener 14 caracteres.';
    public static M_VAL_SS_PATTERN = 'El campo nº SS debe cumplir este patrón: 12/12345678/12.';
    public static M_VAL_NOMBRE_MAX_MIN_LENGHT = 'El campo nombre debe contener 25 caracteres.';
    public static M_VAL_NOMBRE_PATTERN = 'El campo nombre no pueder tener caracteres especiales';
    public static M_VAL_APEL1_MAX_MIN_LENGHT = 'El campo Apellido 2 debe contener 25 caracteres.';
    public static M_VAL_APEL1_PATTERN = 'El campo Apellido 1 no pueder tener caracteres especiales';
    public static M_VAL_APEL2_MAX_MIN_LENGHT = 'El campo Apellido 2 debe contener 25 caracteres.';
    public static M_VAL_APEL2_PATTERN = 'El campo Apellido 2 no pueder tener caracteres especiales';
    public static M_VAL_TLF_MAX_MIN_LENGHT = 'El campo telefono debe contener 9 caracteres.';
    public static M_VAL_TLF_PATTERN = 'El campo telefono debe cumplir este patrón: 9 números';
    public static M_VAL_EMAIL_MAX_LENGHT = 'El campo email debe contener 60 caracteres máximo.';
    public static M_VAL_EMAIL_PATTERN = 'El campo debe tener un formato de email';
    public static M_VAL_FECH_MIN_LENGHT = 'El campo fecha de nacimiento no puede ser inferior al 01-01-1900';
    public static M_VAL_FECH_MAX_LENGHT = 'El campo fecha de nacimiento no puede ser mayor a la fecha actual';
    public static M_VAL_FECH_PATTERN = 'El campo debe ser una fecha válida';

    //HOME TS
    public static IMGBANNER = '../../../assets/img/bannerhome.jpg';
    public static IMGBANNER2 = '../../../assets/img/banner.jpg';
    public static IMGBANNER3 = '../../../assets/img/banner2.jpg';
    public static IMGBANNER4 = '../../../assets/img/banner3.jpg';
    public static TIT_DESCRIPCION = "Un sitio perfecto para crecer";
    public static DESCRIPCION = "Los empleados de Sapientiae aplicamos nuestros valores día a día como estudiantes y profesores. Nuestra cultura es diversa, inclusiva y comprometida con el desarrollo personal y profesional. ¡No nos da miedo afrontar desafíos nuevos y nos encanta realizar cursos de Sapientiae!";

    //HOME HTML
    public static T_HOME = 'Bienvenido a Sapientiae!';
    public static S_COPYRIGHT = '© 2020 Copyright: Sapientiae';

    //LOGIN TS
    public static REDIREC_HOME = 'home';

    //LOGIN HTML
    public static M_ERROR_LOGIN = 'Usuario y/o contraseña errónea';
    public static M_BLOCKED_LOGIN = 'Usuario bloqueado, contacte con el administrador';
    public static L_USUARIO = 'Usuario';
    public static L_CLAVE = 'Contraseña';
    public static BTN_ACCEDER = 'Acceder';

    //NAV-BAR TS - HTML
    public static ICON = '../../../assets/img/LogoFCT.png';
    public static REDIREC_LOGIN = 'login';
    public static S_CREAR = 'Crear';
    public static S_SALIR = 'Cerrar Sesión';

    //ROLE-LIST TS
    public static M_ERROR_FILTRO_ROL_P1 = ' Uppps ';
    public static M_ERROR_FILTRO_ROL_P2 = ' Lo sentimos pero no se ha podido realizar la petición de creación. ';
    public static M_ERROR_MY_ROLE = 'No puedes editar tu propio role';
    public static M_ERROR_ROLE_WITH_USERS = 'No se puede borrar un role con usuarios asignados.';
    public static M_ERROR_DELETE = 'Ocurrió un problema y no se pudo borrar el rol';

    //ROLE-LIST HTML
    public static T_LISTAR_ROL = 'LISTAR ROLES';
    public static BTN_FILTRO_ROL = 'Filtrado de Roles';
    public static L_FILTRO_ROL = 'Nombre del Rol:';

    //SKILL-LIST TS
    public static M_ERROR_FILTRO_SKILL_P1 = ' Uppps ';
    public static M_ERROR_FILTRO_SKILL_P2 = ' Lo sentimos pero no podemos hacer el filtro por Habilidad. ';
    public static M_CREADO_SKILL_P1 = ' Habilidad creada ';
    public static M_CREADO_SKILL_P2 = ' insertado en la base de datos ';
    public static M_ERROR_CREADO_SKILL_P1 = ' Uppps ';
    public static M_ERROR_CREADO_SKILL_P2 = ' Lo sentimos pero no se ha podido realizar la petición de creación. ';
    public static M_EDITAR_SKILL_P1 = ' Habilidad actualizada ';
    public static M_EDITAR_SKILL_P2 = ' insertado en la base de datos ';
    public static M_ERROR_EDITAR_SKILL_P1 = ' Uppps ';
    public static M_ERROR_EDITAR_SKILL_P2 = ' Lo sentimos pero no se ha podido realizar la petición de actualización. ';
    public static REDIREC_LIST_SKILL = 'listSkill/page/';

    //SKILL-LIST HTML
    public static T_LIST_SKILL = 'LISTA DE HABILIDADES';
    public static BTN_CRACION_SKILL = 'Creacion de Habilidad';
    public static BTN_FILTRO_SKILL = 'Filtrado de Habilidad';
    public static L_NOMBRE_SKILL = 'Nombre Habilidad:';
    public static M_ERROR_SKILLS_TITLE = ' Uppps ';
    public static M_ERROR_SKILL_WITH_COURSE = 'No puedes borrar una habilidad asignada a un curso.'

    //USER-LIST TS
    public static M_ERROR_FILTRO_USUARIO_P1 = ' Uppps ';
    public static M_ERROR_FILTRO_USUARIO_P2 = ' Lo sentimos pero no podemos hacer el filtro por DAS. ';
    public static M_ERROR_ELIM_USUARIO_SESION = 'No puedes borrar tu usuario';
    public static M_ERROR_USER_WITH_LOGIN = 'No puedes borrar un usuario con contraseña asignada.'

    //USER-LIST HTML
    public static T_LIST_USUARIOS = 'LISTAR USUARIOS';
    public static BTN_FILTRO_USUARIO = 'Filtrado de Usuarios';
    public static COL_DAS = 'DAS';
    public static COL_APEL1 = 'APELLIDO1';
    public static COL_APEL2 = 'APELLIDO2';
    public static COL_EMAIL = 'EMAIL';
    public static COL_ESTADO = 'ESTADO';

    //FORM-PERMISSIONS TS
    public static SUCCESS_PERMISSIONS_TITLE = 'Permisos asignados';
    public static SUCCESS_PERMISSIONS_MESSAGE = 'Los permisos han sido asignados en la base de datos al role ';

    //FROM-PERMISSIONS HTML
    public static ADD_PERMISSIONS = 'Asignar';
    public static ELEMENTS_TEXT_PERMISSIONS = 'Elementos:';
    public static ADD_PERMISSIONS_TITLE = 'AÑADIR PERMISOS';

    //PERMISSIONS SERVICE
    public static ROUTE_PERMISSIONS_LIST = 'permissions/list';
    public static ROUTE_PERMISSIONS_ELEMENTS = 'permissions/elements';
    public static ROUTE_PERMISSIONS_FOR_SCREEN = 'permissions/permissionsUser/';
    public static ROUTE_PERMISSIONS_FOR_ROLES = 'permissions/role/';
    public static ROUTE_PERMISSIONS_SAVE = 'permissions/save/';
    public static ROUTE_PERMISSIONS = 'permissions';
    
    //FOUND-403
    public static FOUND_403_MESSAGE = 'No tienes los permisos necesarios para acceder a esta página.';
    public static FOUND_403_TITLE = 'Acceso denegado';
    public static FOUND_403_HEADER = 'Sin permisos';
}
