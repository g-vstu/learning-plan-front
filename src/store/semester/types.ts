import createAsyncActionSet, { AsyncActionSet } from 'store/types';

export const GET_WEEKS_SEMESTERS: AsyncActionSet = createAsyncActionSet('GET_WEEKS_SEMESTERS');
export const UPDATE_WEEKS_SEMESTERS: AsyncActionSet = createAsyncActionSet('UPDATE_WEEKS_SEMESTERS');
export const CREATE_WEEKS_SEMESTERS: AsyncActionSet = createAsyncActionSet('CREATE_WEEKS_SEMESTERS');

export const UPDATE_SEMESTER: AsyncActionSet = createAsyncActionSet('UPDATE_SEMESTER');
export const CREATE_SEMESTER: AsyncActionSet = createAsyncActionSet('CREATE_SEMESTER');
export const GET_SEMESTERS: AsyncActionSet = createAsyncActionSet('GET_SEMESTERS');
export const DELETE_SEMESTER: AsyncActionSet = createAsyncActionSet('DELETE_SEMESTER');
