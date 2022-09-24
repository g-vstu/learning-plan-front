import createAsyncActionSet, { AsyncActionSet } from 'store/types';

export const GET_SEMESTERS: AsyncActionSet = createAsyncActionSet('GET_SEMESTERS');
export const GET_WEEKS_SEMESTERS: AsyncActionSet = createAsyncActionSet('GET_WEEKS_SEMESTERS');

export const UPDATE_SEMESTER: AsyncActionSet = createAsyncActionSet('UPDATE_SEMESTER');
export const CREATE_SEMESTER: AsyncActionSet = createAsyncActionSet('CREATE_SEMESTER');

export const DELETE_SEMESTER: AsyncActionSet = createAsyncActionSet('DELETE_SEMESTER');
