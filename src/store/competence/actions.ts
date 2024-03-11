import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_COMPETENCIES } from './types';
import { fetchCompetencies } from './services';
import { Competence } from 'types/competence';

export const getCompetencies = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_COMPETENCIES.start });
        try {
            const competencies: Competence[] = await fetchCompetencies();
            dispatch({
                type: GET_COMPETENCIES.success,
                payload: { competencies },
            });
        } catch (error) {
            dispatch({
                type: GET_COMPETENCIES.failure,
                payload: { error },
            });
        }
    };
};
