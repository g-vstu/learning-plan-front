import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_SUBJECTS } from './types';
import { fetchSubjects } from './services';
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
