import { Reducer } from 'redux';
import { SpecialityState } from 'types';
import {
    CREATE_SPECIALITY,
    GET_SPECIALITIES,
    SET_CURRENT_SPECIALITY,
    UPDATE_SPECIALITY,
} from './types';

const initialState: SpecialityState = {
    specialities: [],
    currentSpeciality: null,
    loading: true,
    error: null,
};

const specialityReducer: Reducer<SpecialityState> = (
    state: SpecialityState = initialState,
    action
) => {
    switch (action.type) {
        case GET_SPECIALITIES.start:
            return onGetSpecialitiesStart(state);
        case GET_SPECIALITIES.success:
            return onGetSpecialitiesSuccess(state, action.payload);
        case GET_SPECIALITIES.failure:
            return onGetSpecialitiesFailure(state, action.payload);

        case SET_CURRENT_SPECIALITY.success:
            return onSetCurrenySpeciality(state, action.payload);

        case CREATE_SPECIALITY.success:
            return onCreateSpecialitySuccess(state, action.payload);
        case UPDATE_SPECIALITY.success:
            return onUpdateSpeciality(state, action.payload);
        default:
            return state;
    }
};

const onGetSpecialitiesStart = (state: SpecialityState): SpecialityState => ({
    ...state,
    loading: true,
});

const onGetSpecialitiesSuccess = (state: SpecialityState, payload): SpecialityState => {
    return {
        ...state,
        specialities: payload.specialities,
        loading: false,
    };
};

const onGetSpecialitiesFailure = (state: SpecialityState, payload): SpecialityState => ({
    ...state,
    loading: false,
    error: payload.error,
});

const onSetCurrenySpeciality = (state: SpecialityState, payload): SpecialityState => ({
    ...state,
    currentSpeciality: payload.speciality,
});

const onCreateSpecialitySuccess = (state: SpecialityState, payload): SpecialityState => ({
    ...state,
    specialities: [...state.specialities, payload.newSpeciality],
});

const onUpdateSpeciality = (state: SpecialityState, payload): SpecialityState => {
    const newSpecialities = state.specialities.map((speciality) => {
        if (speciality?.id === payload.newSpeciality?.id) {
            return payload.newSpeciality;
        } else {
            return speciality;
        }
    });
    return {
        ...state,
        specialities: newSpecialities,
    };
};

export default specialityReducer;
