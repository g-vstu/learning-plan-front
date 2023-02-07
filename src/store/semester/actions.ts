import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import {
    CREATE_SEMESTER,
    CREATE_WEEKS_SEMESTERS,
    DELETE_SEMESTER,
    GET_SEMESTERS,
    GET_WEEKS_SEMESTERS,
    UPDATE_SEMESTER,
    UPDATE_WEEKS_SEMESTERS,
} from './types';
import {
    createSemesterRequest,
    createWeeksSemesterRequest,
    deleteSemesterRequest,
    fetchPlanSemesters,
    fetchSemesters,
    fetchWeeksSemesters,
    updateSemesterRequest,
    updateWeeksSemesterRequest,
} from './services';
import { Semester, WeeksSemester } from 'types';
import console from 'console';

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
export const getPlanSemesters = (
    idPlan: number
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_SEMESTERS.start });
        try {
            const semesters: Semester[] = await fetchPlanSemesters(idPlan);
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
            const weeks: WeeksSemester[] = await fetchWeeksSemesters();
            dispatch({
                type: GET_WEEKS_SEMESTERS.success,
                payload: { weeks },
            });
        } catch (error) {
            dispatch({
                type: GET_WEEKS_SEMESTERS.failure,
                payload: { error },
            });
        }
    };
};

export const updateWeeksSemesters = (
    weeksSemester: WeeksSemester
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_WEEKS_SEMESTERS.start });
        try {
            const updatedweeksSemester: WeeksSemester = await updateWeeksSemesterRequest(
                weeksSemester
            );
            dispatch({
                type: UPDATE_WEEKS_SEMESTERS.success,
                payload: { weeks: updatedweeksSemester },
            });
        } catch (error) {
            dispatch({
                type: UPDATE_WEEKS_SEMESTERS.failure,
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

export const createWeeksSemester = (
    weeksSemester: WeeksSemester
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_WEEKS_SEMESTERS.start });
        try {
            const newWeeksSemester: Semester = await createWeeksSemesterRequest(weeksSemester);
            dispatch({
                type: CREATE_WEEKS_SEMESTERS.success,
                payload: { newWeeksSemester },
            });
        } catch (error) {
            dispatch({
                type: CREATE_WEEKS_SEMESTERS.failure,
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

export const deleteSemester = (semesterId): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: DELETE_SEMESTER.start });
        try {
            await deleteSemesterRequest(semesterId);
            dispatch({
                type: DELETE_SEMESTER.success,
                payload: { semesterId },
            });
        } catch (error) {
            dispatch({
                type: DELETE_SEMESTER.failure,
                payload: { error },
            });
        }
    };
};
