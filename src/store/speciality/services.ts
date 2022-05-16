import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchSpecialities = async () => {
    const { data: specialitites } = await instance.get(`${DEVELOPMENT}/speciality`);
    return specialitites;
};
