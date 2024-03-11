import createAsyncActionSet, { AsyncActionSet } from 'store/types';

export const GET_PRACTICES: AsyncActionSet = createAsyncActionSet('GET_PRACTICES');
export const CREATE_PRACTICE: AsyncActionSet = createAsyncActionSet('CREATE_PRACTICE');
export const DELETE_PRACTICE: AsyncActionSet = createAsyncActionSet('DELETE_PRACTICE');
export const UPDATE_PRACTICE: AsyncActionSet = createAsyncActionSet('UPDATE_PRACTICE');
