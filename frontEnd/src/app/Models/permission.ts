import { Role } from './role';
import { Element } from './element';

export class Permission{
    id?: PkPermission;
    permited?: boolean;
}

export class PkPermission{
    role?: Role;
    element?: Element;
}