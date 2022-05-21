import { ApplicationState } from 'store';
import { GroupUnit } from 'types';
import { createSelector } from 'reselect';

const getGroupUnits = (state: ApplicationState): GroupUnit[] => state.groupUnit.groupUnits;
export const selectGroupUnits = createSelector([getGroupUnits], (groupUnits) => groupUnits);

const getGroupUnitsLoading = (state: ApplicationState): boolean => state.groupUnit.loading;
export const selectGroupUnitsLoading = createSelector([getGroupUnitsLoading], (loading) => loading);
