import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchPlans = async () => {
    const { data: plans } = await instance.get(`${DEVELOPMENT}/plan`);
    return plans;
};
