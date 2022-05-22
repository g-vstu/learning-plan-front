import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Practice } from 'types';

const getPractices = (state: ApplicationState): Practice[] => state.practice.practices;
export const selectPractices = createSelector([getPractices], (practices) => practices);
