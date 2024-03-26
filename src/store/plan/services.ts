import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};
export const duplicatePlan = async (id) => {
    const { data: duplicatedPlan } = await instance.post(
        `${DEVELOPMENT}/duplicate/plan`,
        {
            planIDs: [id],
        },
        fetchConfig
    );
    return duplicatedPlan;
};

export const fetchPlans = async () => {
    const { data: plans } = await instance.get(`${DEVELOPMENT}/plan`, fetchConfig);
    return plans;
};

export const fetchPlan = async (id) => {
    const { data: plan } = await instance.get(`${DEVELOPMENT}/plan/${id}`, fetchConfig);
    return plan;
};

export const delPlanRequest = async (id) => {
    const delId = await instance.delete(`${DEVELOPMENT}/plan/${id}`, fetchConfig);
    return delId;
};

export const createPlanRequest = async (plan) => {
    const { data: newPlan } = await instance.post(`${DEVELOPMENT}/plan`, plan, fetchConfig);
    return newPlan;
};

export const updatePlanRequest = async (plan, specialityId) => {
    const { data: newPlan } = await instance.post(
        `${DEVELOPMENT}/plan?specialityId=${specialityId}`,
        plan,
        fetchConfig
    );
    return newPlan;
};
