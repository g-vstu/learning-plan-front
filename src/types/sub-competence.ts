import { Competence } from './competence';
import { Plan } from './plan';
import { Subject } from './subject';

export interface SubCompetence {
    id: number;
    idCompetence: Competence;
    idSubject: Subject;
}

export interface SubCompetenceState {
    subCompetencies: SubCompetence[];
    currentSubCompetence: SubCompetence;
    loading: boolean;
    error: any;
}
