import { ApplicationState } from 'store';
import { GroupUnit } from 'types';
import { createSelector } from 'reselect';

const getGroupUnits = (state: ApplicationState): GroupUnit[] => state.groupUnit.groupUnits;
export const selectGroupUnits = createSelector([getGroupUnits], (groupUnits) => groupUnits);
