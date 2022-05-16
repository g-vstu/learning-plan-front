import { number } from 'yup';
import { Node } from './node';
import { Plan } from './plan';

export enum CourseWorkType {
    Work = 'work',
    Project = 'project',
}

export enum SemesterType {
    Exam = 'экзамен',
    Test = 'зачет',
}

export interface Semester {
    id: number;
    number: number;
    idNode: Node;
    rgr: number;
    type: SemesterType;

    //subject Node
    laboratory?: number;
    lecture?: number;
    practice?: number;
    ze?: number;
    seminar?: number;

    //another Node
    courceWorkHours: number;
    courceWorkZe: number;
    courseWorkType: CourseWorkType;

    idFaculty: number;
    idTeacher: number;
}

export interface WeeksSemester {
    id: number;
    countWeeks: number;
    numberSemestr: number;
    idPlan: Plan;
}

export interface SemesterState {
    semesters: Semester[];
    currentSemester: Semester;
    weeksSemester: WeeksSemester;
    weeksSemesters: WeeksSemester[];
    loading: boolean;
    error: any;
}
