import { DEVELOPMENT, fetchConfig } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchPlanPractices = async (idPlan) => {
    const { data: practices } = await instance.get(
        `${DEVELOPMENT}/practice/planId/${idPlan}`,
        fetchConfig
    );
    return practices;
};
export const addPracticeRequest = async (practice, planId) => {
    const { data: newPractice } = await instance.post(
        `${DEVELOPMENT}/practice?planId=${planId}`,
        practice,
        fetchConfig
    );
    return newPractice;
};

export const deletePracticeRequest = async (id) => {
    await instance.delete(`${DEVELOPMENT}/practice/${id}`, fetchConfig);
};
export const updatePracticeRequest = async (practice) => {
    const { data: updatedPractice } = await instance.post(
        `${DEVELOPMENT}/practice?planId=${practice.idPlan.id}`,
        practice,
        fetchConfig
    );
    return updatedPractice;
};
