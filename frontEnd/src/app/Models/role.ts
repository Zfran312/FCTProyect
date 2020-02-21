import { User } from './user';

export interface Role{
    idRole?: number;
    description?: string;
    name?: string;
    users?: User[];
}