import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchPractices = async () => {
    const { data: practices } = await instance.get(`${DEVELOPMENT}/practice`);
    return practices;
};
