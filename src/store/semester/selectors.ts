import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Semester, WeeksSemester } from 'types';

const getSemesters = (state: ApplicationState): Semester[] => state.semester.semesters;
export const selectSemesters = createSelector([getSemesters], (semesters) => semesters);

const getWeeksSemesters = (state: ApplicationState): WeeksSemester[] =>
    state.semester.weeksSemesters;
export const selectWeeksSemesters = createSelector([getWeeksSemesters], (semesters) => semesters);

const getSemestersLoading = (state: ApplicationState): boolean => state.semester.loading;
export const selectSemestersLoading = createSelector([getSemestersLoading], (loading) => loading);