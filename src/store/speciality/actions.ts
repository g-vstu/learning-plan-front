import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { CREATE_SPECIALITY, GET_SPECIALITIES } from './types';
import { Plan, Speciality } from 'types';
import { createSpecialityRequest, fetchSpecialities } from './services';
import { createPlanRequest } from 'store/plan/services';
import { CREATE_PLAN } from 'store/plan/types';

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
    speciality,
    plan
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_SPECIALITY.start });
        try {
            const newSpeciality: Speciality = await createSpecialityRequest(speciality);
            const newPlan: Plan = await createPlanRequest(plan, newSpeciality?.id);
            dispatch({
                type: CREATE_SPECIALITY.success,
                payload: { newSpeciality },
            });
            dispatch({
                type: CREATE_PLAN.success,
                payload: { newPlan },
            });
        } catch (error) {
            dispatch({
                type: CREATE_SPECIALITY.failure,
                payload: { error },
            });
        }
    };
};
