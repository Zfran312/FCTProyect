import { Role } from './role';

export class Permission{
    id?: PkPermission;
    permited?: boolean;
}

export class PkPermission{
    role?: Role;
    element?: Element;
}