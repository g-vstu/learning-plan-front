import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_PRACTICES, DELETE_PRACTICE, CREATE_PRACTICE, UPDATE_PRACTICE } from './types';
import {
    addPracticeRequest,
    deletePracticeRequest,
    fetchPlanPractices,
    updatePracticeRequest,
} from './services';
import { Practice } from 'types';

export const getPlanPractices = (
    idPlan: number
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_PRACTICES.start });
        try {
            const practices: Practice[] = await fetchPlanPractices(idPlan);
            dispatch({
                type: GET_PRACTICES.success,
                payload: { practices },
            });
        } catch (error) {
            dispatch({
                type: GET_PRACTICES.failure,
                payload: { error },
            });
        }
    };
};
export const deletePractice = (id: number): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: DELETE_PRACTICE.start });
        try {
            await deletePracticeRequest(id);
            dispatch({
                type: DELETE_PRACTICE.success,
                payload: { id },
            });
        } catch (error) {
            dispatch({
                type: DELETE_PRACTICE.failure,
                payload: { error },
            });
        }
    };
};

export const addPractice = (
    practice,
    planId
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_PRACTICE.start });
        try {
            const newPractice: Practice = await addPracticeRequest(practice, planId);
            dispatch({
                type: CREATE_PRACTICE.success,
                payload: { newPractice },
            });
        } catch (error) {
            dispatch({
                type: CREATE_PRACTICE.failure,
                payload: { error },
            });
        }
    };
};

export const updatePractice = (practice): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_PRACTICE.start });
        try {
            const updatedPractice: Practice = await updatePracticeRequest(practice);
            dispatch({
                type: UPDATE_PRACTICE.success,
                payload: { updatedPractice },
            });
        } catch (error) {
            dispatch({
                type: UPDATE_PRACTICE.failure,
                payload: { error },
            });
        }
    };
};
