import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { GroupComponent } from 'types';

const getGroupComponents = (state: ApplicationState): GroupComponent[] =>
    state.groupComponent.groupComponents;
export const selectGroupComponents = createSelector(
    [getGroupComponents],
    (groupComponents) => groupComponents
);

const getGroupComponentsLoading = (state: ApplicationState): boolean =>
    state.groupComponent.loading;
export const selectGroupComponentsLoading = createSelector(
    [getGroupComponentsLoading],
    (loading) => loading
);
