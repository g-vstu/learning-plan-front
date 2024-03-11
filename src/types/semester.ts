import { number } from 'yup';
import { Node } from './node';
import { Plan } from './plan';

export enum CourseWorkType {
    Work = 'работа',
    Project = 'проект',
}

export enum SemesterType {
    Exam = 'экзамен',
    Test = 'зачёт',
    Prosm = 'просмотр',
    DifTest = 'дифзачёт',
    No = 'нет',
}

export interface Semester {
    id?: number;
    number: number;
    idNode?: Node;
    rgr: number;
    type: SemesterType;
    // selfeducation: number;

    //subject Node
    laboratory?: number;
    lecture?: number;
    practice?: number;
    seminar?: number;
    totalHours?: number;
    ze?: number;

    perWeekLab?: number;
    perWeekLec?: number;
    perWeekPrac?: number;
    perWeekSem?: number;

    //another Node
    courceWorkHours: number;
    courceWorkZe: number;
    courseWorkType: CourseWorkType;

    idFaculty?: number;
    idTeacher?: number;
}

export interface SemesterWeek {
    id: number;
    numberSemestr: number;
    countWeeks: number;
}

export interface WeeksSemester {
    id: number;
    countWeeks: number;
    numberSemestr: number;
    audHours: {
        lk: number;
        pr: number;
        sm: number;
        lb: number;
    };
    idPlan: Plan;
}

export interface SemesterState {
    semesters: Semester[];
    currentSemester: Semester;
    weeksSemester: WeeksSemester;
    weeksSemesters: WeeksSemester[];
    loading: boolean;
    weeksLoading: boolean;
    error: any;
}
