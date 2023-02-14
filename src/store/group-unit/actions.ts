import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { CREATE_GROUP_UNIT, DELETE_GROUP_UNIT, GET_GROUP_UNITS, UPDATE_GROUP_UNIT } from './types';
import {
    createGroupUnitRequest,
    deleteGroupUnitRequest,
    fetchGroupUnits,
    fetchPlanGroupUnits,
    updateGroupUnitsRequest,
} from './services';
import { GroupUnit } from 'types';

export const getGroupUnits = (planId): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_GROUP_UNITS.start });
        try {
            const groupUnits: GroupUnit[] = await fetchPlanGroupUnits(planId);
            dispatch({
                type: GET_GROUP_UNITS.success,
                payload: { groupUnits },
            });
        } catch (error) {
            dispatch({
                type: GET_GROUP_UNITS.failure,
                payload: { error },
            });
        }
    };
};

export const createGroupUnit = (
    groupUnit,
    groupComponentId
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_GROUP_UNIT.start });
        try {
            const newGroupUnit: GroupUnit = await createGroupUnitRequest(
                groupUnit,
                groupComponentId
            );
            dispatch({
                type: CREATE_GROUP_UNIT.success,
                payload: { newGroupUnit },
            });
        } catch (error) {
            dispatch({
                type: CREATE_GROUP_UNIT.failure,
                payload: { error },
            });
        }
    };
};

export const updateGroupUnit = (
    groupUnit,
    groupComponentId
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: UPDATE_GROUP_UNIT.start });
        try {
            const updatedGroupUnit: GroupUnit = await updateGroupUnitsRequest(
                groupUnit,
                groupComponentId
            );
            dispatch({
                type: UPDATE_GROUP_UNIT.success,
                payload: { updatedGroupUnit },
            });
        } catch (error) {
            dispatch({
                type: UPDATE_GROUP_UNIT.failure,
                payload: { error },
            });
        }
    };
};

export const deleteGroupUnit = (
    id: number
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: DELETE_GROUP_UNIT.start });
        try {
            await deleteGroupUnitRequest(id);
            dispatch({
                type: DELETE_GROUP_UNIT.success,
                payload: { id },
            });
        } catch (error) {
            dispatch({
                type: DELETE_GROUP_UNIT.failure,
                payload: { error },
            });
        }
    };
};
