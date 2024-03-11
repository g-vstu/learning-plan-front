import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { CREATE_SPECIALITY, GET_SPECIALITIES, UPDATE_SPECIALITY } from './types';
import { Plan, Speciality } from 'types';
import { createSpecialityRequest, fetchSpecialities, updateSpecialityRequest } from './services';

export const getSpecialities = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_SPECIALITIES.start });
        try {
            const specialities: Speciality[] = await fetchSpecialities();
            dispatch({
                type: GET_SPECIALITIES.success,
                payload: { specialities },
            });
        } catch (error) {
            dispatch({
                type: GET_SPECIALITIES.failure,
                payload: { error },
            });
        }
    };
};

export const createSpeciality = (
    speciality
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_SPECIALITY.start });
        try {
            const newSpeciality: Speciality = await createSpecialityRequest(speciality);
            dispatch({
                type: CREATE_SPECIALITY.success,
                payload: { newSpeciality },
            });
        } catch (error) {
            dispatch({
                type: CREATE_SPECIALITY.failure,
                payload: { error },
            });
        }
    };
};

export const updateSpeciality = (
    speciality
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_SPECIALITY.start });
        try {
            const newSpeciality: Speciality = await updateSpecialityRequest(speciality);
            dispatch({
                type: UPDATE_SPECIALITY.success,
                payload: { newSpeciality },
            });
        } catch (error) {
            dispatch({
                type: UPDATE_SPECIALITY.failure,
                payload: { error },
            });
        }
    };
};
