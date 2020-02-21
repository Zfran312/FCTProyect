import { Role } from './role';
import { Course } from './course';

export interface User{
    idUser?: number;
    dasId?: string;
    nameUser?: string;
    lastname1?: string;
    lastname2?: string;
    email?: string;
    birthDate?: string;
    phone?: string;
    document?: string;
    numSS?: string;
    status?: number;
    deleted?: boolean;
    roles?: Role[];
    userCourse?: Course[];
}