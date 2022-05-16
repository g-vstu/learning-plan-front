import { GroupUnit } from './group-unit';

export interface Subject {
    id: number;
    name: string;
    shifr: string;
    idUnit: GroupUnit;
}

export interface SubjectState {
    subjects: Subject[];
    currentSubject: Subject;
    loading: boolean;
    error: any;
}
