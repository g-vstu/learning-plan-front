import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_SPECIALITIES } from './types';
import { Speciality } from 'types';
import { fetchSpecialities } from './services';

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
