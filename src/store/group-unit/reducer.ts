import { Reducer } from 'redux';
import { GroupUnitState } from 'types';
import { GET_GROUP_UNITS } from './types';

const initialState: GroupUnitState = {
    groupUnits: [],
    currentGroupUnit: null,
    loading: true,
    error: null,
};

const groupUnitReducer: Reducer<GroupUnitState> = (
    state: GroupUnitState = initialState,
    action
) => {
    switch (action.type) {
        case GET_GROUP_UNITS.start:
            return onGetGroupUnitsStart(state);
        case GET_GROUP_UNITS.success:
            return onGetGroupUnitsSuccess(state, action.payload);
        case GET_GROUP_UNITS.failure:
            return onGetGroupUnitsFailure(state, action.payload);

        default:
            return state;
    }
};

const onGetGroupUnitsStart = (state: GroupUnitState): GroupUnitState => ({
    ...state,
    loading: true,
});

const onGetGroupUnitsSuccess = (state: GroupUnitState, payload): GroupUnitState => {
    return {
        ...state,
        groupUnits: payload.groupUnits,
        loading: false,
    };
};

const onGetGroupUnitsFailure = (state: GroupUnitState, payload): GroupUnitState => ({
    ...state,
    loading: false,
    error: payload.error,
});

export default groupUnitReducer;
