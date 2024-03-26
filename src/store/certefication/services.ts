import { DEVELOPMENT, fetchConfig } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchCertefications = async () => {
    const { data: subjects } = await instance.get(`${DEVELOPMENT}/certefication`, fetchConfig);
    return subjects;
};
