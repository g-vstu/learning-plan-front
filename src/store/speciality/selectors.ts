import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Speciality } from 'types';

const getSpecialitites = (state: ApplicationState): Speciality[] => state.speciality.specialities;
export const selectSpecialities = createSelector(
    [getSpecialitites],
    (specialities) => specialities
);

const getSpecialititesLoading = (state: ApplicationState): boolean => state.speciality.loading;
export const selectSpecialitiesLoading = createSelector(
    [getSpecialititesLoading],
    (loading) => loading
);

const getCurrentSpeciality = (state: ApplicationState): Speciality =>
    state.speciality.currentSpeciality;
export const selectCurrentSpeciality = createSelector(
    [getCurrentSpeciality],
    (speciality) => speciality
);
