import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchPlans = async () => {
    const { data: plans } = await instance.get(`${DEVELOPMENT}/plan`);
    return plans;
};

export const fetchPlanAndCreateRelationWithNode = async (planId, node) => {
    const { data: plan } = await instance.get(`${DEVELOPMENT}/plan/${planId}`);
    const associatedRow = {
        ...plan,
        ...node,
    };

    return associatedRow;
    //return plan;
};
