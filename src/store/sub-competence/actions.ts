import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { CREATE_SUB_COMPETENCE, GET_SUB_COMPETENCIES } from './types';
import { createSubCimpetenceRequest, fetchSubCompetencies } from './services';
import { Competence, SubCompetence } from 'types';
import { createCompetenceRequest } from 'store/competence/services';

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

export const createSubCompetence = (
    competence,
    subjectId
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_SUB_COMPETENCE.start });
        try {
            const newCompetence: Competence = await createCompetenceRequest(competence);
            const subCompetence: SubCompetence = await createSubCimpetenceRequest(
                newCompetence?.id,
                subjectId
            );
            dispatch({
                type: CREATE_SUB_COMPETENCE.success,
                payload: { subCompetence },
            });
        } catch (error) {
            dispatch({
                type: CREATE_SUB_COMPETENCE.failure,
                payload: { error },
            });
        }
    };
};
