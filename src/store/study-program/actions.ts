import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_STUDY_PROGRAMS } from './types';
import { fetchStudyPrograms } from './services';
import { StudyProgram } from 'types/study-program';

export const getStudyPrograms = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_STUDY_PROGRAMS.start });
        try {
            const studyPrograms: StudyProgram[] = await fetchStudyPrograms();
            dispatch({
                type: GET_STUDY_PROGRAMS.success,
                payload: { studyPrograms },
            });
        } catch (error) {
            dispatch({
                type: GET_STUDY_PROGRAMS.failure,
                payload: { error },
            });
        }
    };
};
