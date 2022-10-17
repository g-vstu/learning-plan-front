import createAsyncActionSet, { AsyncActionSet } from 'store/types';

export const GET_SPECIALITIES: AsyncActionSet = createAsyncActionSet('GET_SPECIALITIES');
export const SET_CURRENT_SPECIALITY: AsyncActionSet =
    createAsyncActionSet('SET_CURRENT_SPECIALITY');
export const CREATE_SPECIALITY: AsyncActionSet = createAsyncActionSet('CREATE_SPECIALITY');

export const UPDATE_SPECIALITY: AsyncActionSet = createAsyncActionSet('UPDATE_SPECIALITY');
