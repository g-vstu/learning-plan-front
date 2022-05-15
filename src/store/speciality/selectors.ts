import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Speciality } from 'types';

const getSpecialitites = (state: ApplicationState): Speciality[] => state.speciality.specialities;
export const selectSpecialities = createSelector(
    [getSpecialitites],
    (specialities) => specialities
);
