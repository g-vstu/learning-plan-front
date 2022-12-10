import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { CREATE_PLAN, GET_PLANS, SET_CURRENT_PLAN } from './types';
import { createPlanRequest, fetchPlan, fetchPlans } from './services';
import { Node, Plan, Semester, Speciality } from 'types';
import { fetchNodes } from 'store/node/services';
import { fetchSemesters } from 'store/semester/services';
import { GET_NODES } from 'store/node/types';
import { GET_SEMESTERS } from 'store/semester/types';
import { fetchSpeciality } from 'store/speciality/services';
import { SET_CURRENT_SPECIALITY } from 'store/speciality/types';

export const getPlans = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_PLANS.start });
        try {
            const plans: Plan[] = await fetchPlans();
            dispatch({
                type: GET_PLANS.success,
                payload: { plans },
            });
        } catch (error) {
            dispatch({
                type: GET_PLANS.failure,
                payload: { error },
            });
        }
    };
};

export const createPlan = (
    plan,
    specialityId
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_PLAN.start });
        try {
            const newPlan: Plan = await createPlanRequest(plan, specialityId);
            dispatch({
                type: CREATE_PLAN.success,
                payload: { newPlan },
            });
        } catch (error) {
            dispatch({
                type: CREATE_PLAN.failure,
                payload: { error },
            });
        }
    };
};

export const getGlobalPlan = (
    planId: number
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_PLANS.start });
        try {
            const necessaryPlan: Plan = await fetchPlan(planId);

            const speciality: Speciality = await fetchSpeciality(necessaryPlan?.idSpeciality?.id);

            const plans: Plan[] = await fetchPlans();

            const plansWithAssociatedSpeciality = plans.filter(
                (plan) => plan?.idSpeciality?.id === speciality?.id
            );
            const nodes: Node[] = await fetchNodes();
            const associatedNodes = nodes.filter((node) => node?.idPlan?.id === necessaryPlan.id);

            const semesters: Semester[] = await fetchSemesters();
            const associatedSemesters = semesters?.filter((semester) => {
                return (
                    associatedNodes.filter((node) => {
                        return node?.id === semester?.idNode?.id;
                    }).length !== 0
                );
            });

 /*           const цуулы: Week[] = await fetchNodes();
            const associatedNodes = nodes.filter((node) => node?.idPlan?.id === necessaryPlan.id);
*/

            dispatch({
                type: GET_PLANS.success,
                payload: { plans: plansWithAssociatedSpeciality },
            });
            dispatch({
                type: GET_NODES.success,
                payload: { nodes: associatedNodes },
            });
            dispatch({
                type: GET_SEMESTERS.success,
                payload: { semesters: associatedSemesters },
            });
            dispatch({
                type: SET_CURRENT_SPECIALITY.success,
                payload: { speciality },
            });
            dispatch({
                type: SET_CURRENT_PLAN.success,
                payload: { currentPlan: necessaryPlan },
            });
        } catch (error) {
            dispatch({
                type: GET_PLANS.failure,
                payload: { error },
            });
        }
    };
};
