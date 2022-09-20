import { Speciality } from './speciality';
import { Subject } from './subject';

export enum EducationForm {
    FullTime = 'очная',
    Extramural = 'заочная',
}

export interface Plan {
    id: number;
    diplomCountWeek: number;
    diplomIdSemestr: number;
    diplomName: string;
    diplomZe: string;
    educationForm: EducationForm;
    enrollmentYear: string;
    govExam: number;
    idSpeciality: Speciality;
    learnYear: string;
    regNumber: string;
    utvDate: string;
    //NEW
    idSubject: Subject;
}

export interface PlanState {
    plans: Plan[];
    currentPlan: Plan;
    loading: boolean;
    error: any;
}
