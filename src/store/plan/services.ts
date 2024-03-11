import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const duplicatePlan = async (id) => {
    const { data: duplicatedPlan } = await instance.post(`${DEVELOPMENT}/duplicate/plan`, {
        planIDs: [id],
    });
    return duplicatedPlan;
};

export const fetchPlans = async () => {
    const { data: plans } = await instance.get(`${DEVELOPMENT}/plan`);
    return plans;
};

export const fetchPlan = async (id) => {
    const { data: plan } = await instance.get(`${DEVELOPMENT}/plan/${id}`);
    return plan;
};

export const delPlanRequest = async (id) => {
    const delId = await instance.delete(`${DEVELOPMENT}/plan/${id}`);
    return delId;
};

export const createPlanRequest = async (plan, specialityId) => {
    const { data: newPlan } = await instance.post(
        `${DEVELOPMENT}/plan?specialityId=${specialityId}`,
        plan
    );
    return newPlan;
};

export const updatePlanRequest = async (plan, specialityId) => {
    const { data: newPlan } = await instance.post(
        `${DEVELOPMENT}/plan?specialityId=${specialityId}`,
        plan
    );
    return newPlan;
};
