import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { fetchGroupComponents } from './services';
import { GET_GROUP_COMPONENTS } from './types';
import { GroupComponent } from 'types';

export const getGroupComponents = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_GROUP_COMPONENTS.start });
        try {
            const groupComponents: GroupComponent[] = await fetchGroupComponents();
            dispatch({
                type: GET_GROUP_COMPONENTS.success,
                payload: { groupComponents },
            });
        } catch (error) {
            dispatch({
                type: GET_GROUP_COMPONENTS.failure,
                payload: { error },
            });
        }
    };
};
