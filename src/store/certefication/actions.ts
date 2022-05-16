import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_CERTEFICATIONS } from './types';
import { fetchCertefications } from './services';
import { Certefication } from 'types';

export const getCertefications = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_CERTEFICATIONS.start });
        try {
            const certefications: Certefication[] = await fetchCertefications();
            dispatch({
                type: GET_CERTEFICATIONS.success,
                payload: { certefications },
            });
        } catch (error) {
            dispatch({
                type: GET_CERTEFICATIONS.failure,
                payload: { error },
            });
        }
    };
};
