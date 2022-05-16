import { Plan } from './plan';

export interface Practice {
    id: number;
    countWeek: number;
    idSemester: number;
    name: string;
    ze: number;
    idPlan: Plan;
}

export interface PracticeState {
    practices: Practice[];
    currentPractice: Practice;
    loading: boolean;
    error: any;
}
