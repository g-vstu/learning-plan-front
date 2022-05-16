import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Node } from 'types';

const getNodes = (state: ApplicationState): Node[] => state.node.nodes;
export const selectNodes = createSelector([getNodes], (nodes) => nodes);
