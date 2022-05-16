import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_PRACTICES } from './types';
import { fetchPractices } from './services';
import { Practice } from 'types';

export const getPractices = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_PRACTICES.start });
        try {
            const practices: Practice[] = await fetchPractices();
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
