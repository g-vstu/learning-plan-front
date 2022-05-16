import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_NODES } from './types';
import { Node } from 'types';
import { fetchNodes } from './services';

export const getNodes = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_NODES.start });
        try {
            const nodes: Node[] = await fetchNodes();
            dispatch({
                type: GET_NODES.success,
                payload: { nodes },
            });
        } catch (error) {
            dispatch({
                type: GET_NODES.failure,
                payload: { error },
            });
        }
    };
};
