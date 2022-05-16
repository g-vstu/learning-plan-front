import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Competence } from 'types/competence';

const getCompetencies = (state: ApplicationState): Competence[] => state.competence.competencies;
export const selectCompetencies = createSelector([getCompetencies], (competencies) => competencies);
