import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_GROUP_UNITS } from './types';
import { fetchGroupUnits } from './services';
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
