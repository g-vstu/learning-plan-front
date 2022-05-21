import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Subject } from 'types';

const getSubjects = (state: ApplicationState): Subject[] => state.subject.subjects;
export const selectSubjects = createSelector([getSubjects], (subjects) => subjects);

const getSubjectsLoading = (state: ApplicationState): boolean => state.subject.loading;
export const selectSubjectsLoading = createSelector([getSubjectsLoading], (loading) => loading);
