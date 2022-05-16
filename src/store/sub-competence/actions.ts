import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_SUB_COMPETENCIES } from './types';
import { fetchSubCompetencies } from './services';
import { SubCompetence } from 'types';

export const getSubCompetencies = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_SUB_COMPETENCIES.start });
        try {
            const subCompetencies: SubCompetence[] = await fetchSubCompetencies();
            dispatch({
                type: GET_SUB_COMPETENCIES.success,
                payload: { subCompetencies },
            });
        } catch (error) {
            dispatch({
                type: GET_SUB_COMPETENCIES.failure,
                payload: { error },
            });
        }
    };
};
