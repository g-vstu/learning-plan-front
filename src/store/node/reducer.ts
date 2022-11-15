import { Reducer } from 'redux';
import { Node, NodeState } from 'types/node';
import { CREATE_NODE, DELETE_NODE, GET_NODES, UPDATE_NODE } from './types';

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
        case DELETE_NODE.success:
            return onDeleteNode(state, action.payload);

        case CREATE_NODE.success:
            return onCreateNodeSuccess(state, action.payload);
        case UPDATE_NODE.success:
            return onUpdateNode(state, action.payload);

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

const onCreateNodeSuccess = (state: NodeState, payload): NodeState => {
    return {
        ...state,
        nodes: [...state.nodes, payload.newNode],
    };
};

const onDeleteNode = (state: NodeState, payload): NodeState => ({
    ...state,
    loading: false,
    nodes: state.nodes.filter((node) => node.id !== payload.id),
});

const onUpdateNode = (state: NodeState, payload: { updatedNode: Node }): NodeState => {
    const newNodes = state.nodes.map((node) => {
        if (node?.id === payload.updatedNode?.id) {
            return payload.updatedNode;
        } else {
            return node;
        }
    });
    return {
        ...state,
        nodes: newNodes,
    };
};

export default nodeReducer;
