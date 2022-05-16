import { Subject } from './subject';

export interface StudyProgram {
    id: number;
    dateApprove: string;
    idSubject: Subject;
}

export interface StudyProgramState {
    studyPrograms: StudyProgram[];
    currentStudyProgram: StudyProgram;
    loading: boolean;
    error: any;
}
