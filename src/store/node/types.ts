import createAsyncActionSet, { AsyncActionSet } from 'store/types';

export const GET_NODES: AsyncActionSet = createAsyncActionSet('GET_NODES');
export const CREATE_NODE: AsyncActionSet = createAsyncActionSet('CREATE_NODE');
export const CREATE_NODE_WITH_SUBJECT: AsyncActionSet = createAsyncActionSet(
    'CREATE_NODE_WITH_SUBJECT'
);
export const DELETE_NODE: AsyncActionSet = createAsyncActionSet('DELETE_NODE');

export const UPDATE_NODE: AsyncActionSet = createAsyncActionSet('UPDATE_NODE');
