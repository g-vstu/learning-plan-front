import { Reducer } from 'redux';
import { PlanState } from 'types';
import { GET_PLANS } from './types';

const initialState: PlanState = {
    plans: [],
    currentPlan: null,
    loading: true,
    error: null,
};

const planReducer: Reducer<PlanState> = (state: PlanState = initialState, action) => {
    switch (action.type) {
        case GET_PLANS.start:
            return onGetPlansStart(state);
        case GET_PLANS.success:
            return onGetPlansSuccess(state, action.payload);
        case GET_PLANS.failure:
            return onGetPlansFailure(state, action.payload);

        default:
            return state;
    }
};

const onGetPlansStart = (state: PlanState): PlanState => ({
    ...state,
    loading: true,
});

const onGetPlansSuccess = (state: PlanState, payload): PlanState => {
    return {
        ...state,
        plans: payload.plans,
        loading: false,
    };
};

const onGetPlansFailure = (state: PlanState, payload): PlanState => ({
    ...state,
    loading: false,
    error: payload.error,
});

export default planReducer;
