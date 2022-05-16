export interface Competence {
    id: number;
    nameCompetence: string;
    shifrCompetence: string;
}

export interface CompetenceState {
    competencies: Competence[];
    currentCompetence: Competence;
    loading: boolean;
    error: any;
}
