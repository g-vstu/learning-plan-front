import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchNodes = async () => {
    const { data: nodes } = await instance.get(`${DEVELOPMENT}/node`);
    return nodes;
};
