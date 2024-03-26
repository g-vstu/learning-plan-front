import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';
const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const fetchCertefications = async () => {
    const { data: subjects } = await instance.get(`${DEVELOPMENT}/certefication`, fetchConfig);
    return subjects;
};
