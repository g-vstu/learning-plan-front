import { Reducer } from 'redux';
import { PlanState } from 'types';
import { CREATE_PLAN, DELETE_PLAN, GET_PLANS, SET_CURRENT_PLAN } from './types';

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

        case CREATE_PLAN.success:
            return onCreatePlanSuccess(state, action.payload);

        case DELETE_PLAN.success:
            return onDeletePlanSuccess(state, action.payload);

        case SET_CURRENT_PLAN.success:
            return onSetCurrentPlanSuccess(state, action.payload);

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

const onCreatePlanSuccess = (state: PlanState, payload): PlanState => ({
    ...state,
    plans: [...state.plans, payload.newPlan],
});

const onSetCurrentPlanSuccess = (state: PlanState, payload): PlanState => {
    return {
        ...state,
        currentPlan: payload.currentPlan,
    };
};

const onDeletePlanSuccess = (state: PlanState, payload): PlanState => ({
    ...state,
    plans: state.plans.filter((plan) => plan.id !== payload.id),
});
export default planReducer;
