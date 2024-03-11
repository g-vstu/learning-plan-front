import { Plan } from './plan';

export interface Certefication {
    id: number;
    idPlan: Plan;
}

export interface CerteficationState {
    certefications: Certefication[];
    currentCertefication: Certefication;
    loading: boolean;
    error: any;
}
