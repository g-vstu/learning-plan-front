import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Subject } from 'types';

const getSubjects = (state: ApplicationState): Subject[] => state.subject.subjects;
export const selectSubjects = createSelector([getSubjects], (subjects) => subjects);
