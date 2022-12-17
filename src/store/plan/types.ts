import createAsyncActionSet, { AsyncActionSet } from 'store/types';

export const GET_PLANS: AsyncActionSet = createAsyncActionSet('GET_PLANS');
export const CREATE_PLAN: AsyncActionSet = createAsyncActionSet('CREATE_PLAN');
export const DELETE_PLAN: AsyncActionSet = createAsyncActionSet('DELETE_PLAN');

export const SET_CURRENT_PLAN: AsyncActionSet = createAsyncActionSet('SET_CURRENT_PLAN');
