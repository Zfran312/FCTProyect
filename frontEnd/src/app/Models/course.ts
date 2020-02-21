import { Skill } from './skill';

export interface Course{
    idCourse?: number;
    nameCourse?: string;
    descC?: string;
    duration?: number;
    topic?: string;
    level?: string;
    published?: boolean;
    preview?: string;
    route?: string;
    skills?: Skill[];
}