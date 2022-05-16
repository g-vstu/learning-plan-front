import { Node } from './node';

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

export interface SemesterState {
    semesters: Semester[];
    currentSemester: Semester;
    loading: boolean;
    error: any;
}
