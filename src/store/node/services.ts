import { DEVELOPMENT, fetchConfig } from 'config/constants';
import instance from 'store/auth/instance';
import { Plan } from 'types';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const fetchNodes = async () => {
    const { data: nodes } = await instance.get(`${DEVELOPMENT}/node`, fetchConfig);
    return nodes;
};

export const fetchPlanNodes = async (idPlan: number) => {
    const { data: nodes } = await instance.get(`${DEVELOPMENT}/node/planId/${idPlan}`, fetchConfig);
    return nodes;
};

export const createNodeRequest = async (node, subjectId, plan: Plan) => {
    const { data: newNode } = await instance.post(
        `${DEVELOPMENT}/node?planId=${plan?.id}&subjectId=${subjectId}`,
        node,
        fetchConfig
    );
    return newNode;
};

export const deleteNodeRequest = async (id) => {
    await instance.delete(`${DEVELOPMENT}/node/${id}`, fetchConfig);
};
