import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { CREATE_GROUP_UNIT, GET_GROUP_UNITS } from './types';
import { createGroupUnitRequest, fetchGroupUnits } from './services';
import { GroupUnit } from 'types';

export const getGroupUnits = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_GROUP_UNITS.start });
        try {
            const groupUnits: GroupUnit[] = await fetchGroupUnits();
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
