import { Reducer } from 'redux';
import { GroupComponentState } from 'types';
import { GET_GROUP_COMPONENTS } from './types';

const initialState: GroupComponentState = {
    groupComponents: [],
    currentGroupComponent: null,
    loading: true,
    error: null,
};

const groupComponentReducer: Reducer<GroupComponentState> = (
    state: GroupComponentState = initialState,
    action
) => {
    switch (action.type) {
        case GET_GROUP_COMPONENTS.start:
            return onGetGroupComponentsStart(state);
        case GET_GROUP_COMPONENTS.success:
            return onGetGroupComponentsSuccess(state, action.payload);
        case GET_GROUP_COMPONENTS.failure:
            return onGetGroupComponentsFailure(state, action.payload);

        default:
            return state;
    }
};

const onGetGroupComponentsStart = (state: GroupComponentState): GroupComponentState => ({
    ...state,
    loading: true,
});

const onGetGroupComponentsSuccess = (state: GroupComponentState, payload): GroupComponentState => {
    return {
        ...state,
        groupComponents: payload.groupComponents,
        loading: false,
    };
};

const onGetGroupComponentsFailure = (state: GroupComponentState, payload): GroupComponentState => ({
    ...state,
    loading: false,
    error: payload.error,
});

export default groupComponentReducer;
