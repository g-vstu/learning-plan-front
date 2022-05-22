import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';
import { Plan } from 'types';

export const fetchNodes = async () => {
    const { data: nodes } = await instance.get(`${DEVELOPMENT}/node`);
    return nodes;
};

export const createNodeRequest = async (node, subjectId, plan: Plan) => {
    const { data: newNode } = await instance.post(
        `${DEVELOPMENT}/node?planId=${plan?.id}&subjectId=${subjectId}`,
        node
    );
    return newNode;
};
