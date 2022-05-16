import { Reducer } from 'redux';
import { NodeState } from 'types/node';
import { GET_NODES } from './types';

const initialState: NodeState = {
    nodes: [],
    currentNode: null,
    loading: true,
    error: null,
};

const nodeReducer: Reducer<NodeState> = (state: NodeState = initialState, action) => {
    switch (action.type) {
        case GET_NODES.start:
            return onGetNodesStart(state);
        case GET_NODES.success:
            return onGetNodesSuccess(state, action.payload);
        case GET_NODES.failure:
            return onGetNodesFailure(state, action.payload);

        default:
            return state;
    }
};

const onGetNodesStart = (state: NodeState): NodeState => ({
    ...state,
    loading: true,
});

const onGetNodesSuccess = (state: NodeState, payload): NodeState => {
    return {
        ...state,
        nodes: payload.nodes,
        loading: false,
    };
};

const onGetNodesFailure = (state: NodeState, payload): NodeState => ({
    ...state,
    loading: false,
    error: payload.error,
});

export default nodeReducer;
