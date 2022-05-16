import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Semester } from 'types';

const getSemesters = (state: ApplicationState): Semester[] => state.semester.semesters;
export const selectSemesters = createSelector([getSemesters], (semesters) => semesters);
