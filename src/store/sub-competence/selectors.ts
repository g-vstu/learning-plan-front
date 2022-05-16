import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { SubCompetence, Subject } from 'types';

const getSubCompetencies = (state: ApplicationState): SubCompetence[] =>
    state.subCompetence.subCompetencies;
export const selectSubjects = createSelector(
    [getSubCompetencies],
    (subCompetencies) => subCompetencies
);
