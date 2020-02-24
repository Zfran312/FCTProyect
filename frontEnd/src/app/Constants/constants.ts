import { User } from '../Models/user';

export class Constants{
    //LOGIN
    public static CERO = 0;
    public static UNO = 1;
    public static DOS = 2;
    public static TRES = 3;
    public static VACIO = '';
    public static ICON = '../../../assets/img/LogoFCT.png';
    public static M_ERROR_LOGIN = 'Usuario y/o contraseña errónea';
    public static M_BLOCKED_LOGIN = 'Usuario bloqueado, contacte con el administrador';
    public static L_USUARIO = 'Usuario';
    public static L_CLAVE = 'Contraseña';
    public static BTN_ACCEDER = 'Acceder';
    public static L_MOSTRAR_CLAVE = 'Mostrar Contraseñas';
    public static M_VAL_REQUIRED = 'El campo es obligatorio.';
    public static M_VAL_DAS_PATTERN = 'El campo das debe cumplir este patrón: 1 letra mayúscula seguida de 6 números';
    public static S_USERNAME = 'username';
    public static S_PASSWORD = 'pass';
    public static REDIREC_HOME = 'home';

    //NAV-BAR
    public static S_M_USUARIO = 'Usuario';
    public static S_M_ROLES = 'Roles';
    public static S_M_CURSOS = 'Cursos';
    public static S_M_HABILIDADES = 'Habilidades';
    public static S_M_PERFIL = 'Perfil';
    public static T_CREACION_ROL = 'Crear Roles';
    public static T_CREAR_USUARIO = 'Crear Usuario';
    public static T_CREACION_CURSO = 'Crear Curso';
    public static S_COMA = ',';
    public static S_ESPACIO = ' ';
    public static REDIREC_LOGIN = 'login';
    public static S_CREAR = 'Crear';
    public static S_SALIR = 'Cerrar Sesión';


    //URL BACK
    public static API_URI = 'http://localhost:8080/api/';
    public static S_LOGIN = 'login';
    public static LOGIN_ATTEMPTS = 'login/addattempt';
    public static LOGIN_USER_STATUS = 'login/checkstatus';

    //Objetos - NAV-BAR
    public static USER_DAFAULT: User = {
        idUser: Constants.CERO, dasId: Constants.VACIO, nameUser: Constants.VACIO, lastname1: Constants.VACIO, lastname2: Constants.VACIO, email: Constants.VACIO,
        birthDate: Constants.VACIO, phone: Constants.VACIO, document: Constants.VACIO, numSS: Constants.VACIO, status: Constants.CERO, deleted: false, roles: []
      };
}