import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchGroupUnits = async () => {
    const { data: groupUnits } = await instance.get(`${DEVELOPMENT}/group_units`);
    return groupUnits;
};
