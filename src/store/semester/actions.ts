import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { CREATE_SEMESTER, GET_SEMESTERS, GET_WEEKS_SEMESTERS, UPDATE_SEMESTER } from './types';
import {
    createSemesterRequest,
    fetchSemesters,
    fetchWeeksSemesters,
    updateSemesterRequest,
} from './services';
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

export const updateSemester = (
    semester: Semester
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_SEMESTER.start });
        try {
            const updatedSemester: Semester = await updateSemesterRequest(semester);
            dispatch({
                type: UPDATE_SEMESTER.success,
                payload: { semester: updatedSemester },
            });
        } catch (error) {
            dispatch({
                type: UPDATE_SEMESTER.failure,
                payload: { error },
            });
        }
    };
};

export const createSemester = (
    semester: Semester,
    node
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_SEMESTER.start });
        try {
            const newSemester: Semester = await createSemesterRequest(semester, node);
            dispatch({
                type: CREATE_SEMESTER.success,
                payload: { newSemester },
            });
        } catch (error) {
            dispatch({
                type: CREATE_SEMESTER.failure,
                payload: { error },
            });
        }
    };
};
