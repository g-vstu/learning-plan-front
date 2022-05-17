import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { GET_PLANS } from './types';
import { fetchPlanAndCreateRelationWithNode, fetchPlans } from './services';
import { GroupComponent, Node, Plan, Semester } from 'types';
import { fetchNodes } from 'store/node/services';
import { fetchGroupComponents } from 'store/group-component/services';
import { fetchSemesters } from 'store/semester/services';
import { GET_NODES } from 'store/node/types';
import { GET_SEMESTERS } from 'store/semester/types';

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

export const getGlobalPlan = (
    specialityId: number
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_PLANS.start });
        try {
            const plans: Plan[] = await fetchPlans();
            const plansWithAssociatedSpeciality = plans.filter(
                (plan) => plan?.idSpeciality?.id === specialityId
            );
            //All associated plans
            const nodes: Node[] = await fetchNodes();
            const associatedNodes = nodes.filter((node) => {
                return (
                    plansWithAssociatedSpeciality.filter((plan) => {
                        return plan?.id === node?.idPlan?.id;
                    }).length !== 0
                );
            });

            const semesters: Semester[] = await fetchSemesters();
            const associatedSemesters = semesters?.filter((semester) => {
                return (
                    associatedNodes.filter((node) => {
                        return node?.idNode === semester?.idNode?.idNode;
                    }).length !== 0
                );
            });

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
        } catch (error) {
            dispatch({
                type: GET_PLANS.failure,
                payload: { error },
            });
        }
    };
};

export const getGlobalPlan1 = (
    specialityId: number
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_PLANS.start });
        try {
            /*const plans: Plan[] = await fetchPlans();
            const plansWithAssociatedSpeciality = plans.filter(
                (plan) => plan?.idSpeciality?.id === specialityId
            );

            const nodes: Node[] = await fetchNodes();
            const associatedNodes = nodes.filter((node) => {
                return plansWithAssociatedSpeciality.map((plan) => {
                    return plan?.id === node?.idPlan?.id;
                });
            });*/

            //FIRST STEP load all nodes and create relatonship with all plans objWithPlanAndNode
            //SECOND STEP filter objWithPlanAndNode by plans with associated speciality
            //will be only associated nodes with that speciality
            //THIRD STEP load all semesters and filter semesters by asssociated speciality

            const nodes: Node[] = await fetchNodes();
            const objWithPlanAndNode: (Node & Plan)[] = []; //This arrays contains information about all nodes with all associated plans

            await Promise.all(
                nodes?.map(async (node) => {
                    const obj = await fetchPlanAndCreateRelationWithNode(node?.idPlan?.id, node);
                    objWithPlanAndNode.push(obj);
                })
            );

            const semesters: Semester[] = await fetchSemesters();

            /*const dataAboutSpecialityPlanWithAsociatedSemester = objWithPlanAndNode.filter(
                (obj) => {
                    return semesters.filter((semester) => {
                        if (semester?.idNode?.idNode === obj?.idNode) {
                            const obb = {
                                ...obj,
                                semester: {
                                    ...semester,
                                },
                            };
                            return obb;
                        } else {
                            return;
                        }
                    });
                }
            );*/
            const associatedSemestersWithNodes = semesters?.filter((semester) => {
                return (
                    objWithPlanAndNode.filter((obj) => {
                        return obj?.idNode === semester?.idNode?.idNode;
                    }).length !== 0
                );
            });

            const createObjWithSemesters = objWithPlanAndNode.map((obj) => {
                return associatedSemestersWithNodes.map((semester) => {
                    if (obj?.idNode === semester?.idNode?.idNode) {
                        return {
                            ...obj,
                            semester: {
                                ...semester,
                            },
                        };
                    }
                });
            });
            dispatch({
                type: GET_PLANS.success,
                payload: {},
            });
        } catch (error) {
            dispatch({
                type: GET_PLANS.failure,
                payload: { error },
            });
        }
    };
};
