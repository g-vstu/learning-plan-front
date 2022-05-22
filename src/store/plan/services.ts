import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchPlans = async () => {
    const { data: plans } = await instance.get(`${DEVELOPMENT}/plan`);
    return plans;
};

export const fetchPlan = async (id) => {
    const { data: plan } = await instance.get(`${DEVELOPMENT}/plan/${id}`);
    return plan;
};

export const createPlanRequest = async (plan, specialityId) => {
    const { data: newPlan } = await instance.post(
        `${DEVELOPMENT}/plan?specialityId=${specialityId}`,
        plan
    );
    return newPlan;
};
