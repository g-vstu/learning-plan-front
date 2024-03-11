import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { ADD_SUBJECT, DELETE_SUBJECT, GET_SUBJECTS, UPDATE_SUBJECT } from './types';
import {
    addSubjectRequest,
    deleteSubjectRequest,
    fetchSubjects,
    updateSubjectRequest,
} from './services';
import { Subject } from 'types';

export const getSubjects = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_SUBJECTS.start });
        try {
            const subjects: Subject[] = await fetchSubjects();
            dispatch({
                type: GET_SUBJECTS.success,
                payload: { subjects },
            });
        } catch (error) {
            dispatch({
                type: GET_SUBJECTS.failure,
                payload: { error },
            });
        }
    };
};

export const addSubject = (
    subject,
    groupUnitId
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: ADD_SUBJECT.start });
        try {
            const newSubject: Subject = await addSubjectRequest(subject, groupUnitId);
            dispatch({
                type: ADD_SUBJECT.success,
                payload: { subject: newSubject },
            });
        } catch (error) {
            dispatch({
                type: ADD_SUBJECT.failure,
                payload: { error },
            });
        }
    };
};

export const deleteSubject = (id: number): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: DELETE_SUBJECT.start });
        try {
            await deleteSubjectRequest(id);
            dispatch({
                type: DELETE_SUBJECT.success,
                payload: { id },
            });
        } catch (error) {
            dispatch({
                type: DELETE_SUBJECT.failure,
                payload: { error },
            });
        }
    };
};

export const updateSubject = (
    subject,
    unitId
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_SUBJECT.start });
        try {
            const newSubject: Subject = await updateSubjectRequest(subject, unitId);
            dispatch({
                type: UPDATE_SUBJECT.success,
                payload: { newSubject },
            });
        } catch (error) {
            dispatch({
                type: UPDATE_SUBJECT.failure,
                payload: { error },
            });
        }
    };
};
