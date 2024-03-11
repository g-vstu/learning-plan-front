import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Node } from 'types';

const getNodes = (state: ApplicationState): Node[] => state.node.nodes;
export const selectNodes = createSelector([getNodes], (nodes) => nodes);

const getNodesLoading = (state: ApplicationState): boolean => state.node.loading;
export const selectNodesLoading = createSelector([getNodesLoading], (loading) => loading);
