import { Reducer } from 'redux';
import { GroupUnitState } from 'types';
import { CREATE_GROUP_UNIT, DELETE_GROUP_UNIT, GET_GROUP_UNITS, UPDATE_GROUP_UNIT } from './types';

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

        case DELETE_GROUP_UNIT.success:
            return onDeleteGroupUnit(state, action.payload);

        case CREATE_GROUP_UNIT.success:
            return onCreateGroupUnitSuccess(state, action.payload);

        case UPDATE_GROUP_UNIT.success:
            return onUpdateGroupUnit(state, action.payload);

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

const onCreateGroupUnitSuccess = (state: GroupUnitState, payload): GroupUnitState => ({
    ...state,
    groupUnits: [...state.groupUnits, payload.newGroupUnit],
});

const onDeleteGroupUnit = (state: GroupUnitState, payload): GroupUnitState => ({
    ...state,
    groupUnits: state.groupUnits.filter((groupUnit) => groupUnit.id !== payload.id),
});

const onUpdateGroupUnit = (state: GroupUnitState, payload): GroupUnitState => {
    const newGroupUnits = state.groupUnits.map((unit) => {
        if (unit?.id === payload.updatedGroupUnit?.id) {
            return payload.updatedGroupUnit;
        } else {
            return unit;
        }
    });
    return {
        ...state,
        groupUnits: newGroupUnits,
    };
};

export default groupUnitReducer;
