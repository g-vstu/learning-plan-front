import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { SubCompetence } from 'types';

const getSubCompetencies = (state: ApplicationState): SubCompetence[] =>
    state.subCompetence.subCompetencies;
export const selectSubCompetencies = createSelector(
    [getSubCompetencies],
    (subCompetencies) => subCompetencies
);

const getSubCompetenciesLoading = (state: ApplicationState): boolean => state.subCompetence.loading;
export const selectSubCompetenciesLoading = createSelector(
    [getSubCompetenciesLoading],
    (loading) => loading
);
