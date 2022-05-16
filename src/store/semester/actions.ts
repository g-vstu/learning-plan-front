import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_SEMESTERS, GET_WEEKS_SEMESTERS } from './types';
import { fetchSemesters, fetchWeeksSemesters } from './services';
import { Semester, WeeksSemester } from 'types';

export const getSemesters = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_SEMESTERS.start });
        try {
            const semesters: Semester[] = await fetchSemesters();
            dispatch({
                type: GET_SEMESTERS.success,
                payload: { semesters },
            });
        } catch (error) {
            dispatch({
                type: GET_SEMESTERS.failure,
                payload: { error },
            });
        }
    };
};

export const getWeeksSemesters = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_WEEKS_SEMESTERS.start });
        try {
            const semesters: WeeksSemester[] = await fetchWeeksSemesters();
            dispatch({
                type: GET_WEEKS_SEMESTERS.success,
                payload: { semesters },
            });
        } catch (error) {
            dispatch({
                type: GET_WEEKS_SEMESTERS.failure,
                payload: { error },
            });
        }
    };
};
