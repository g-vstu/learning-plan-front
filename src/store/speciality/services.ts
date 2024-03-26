import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const fetchSpecialities = async () => {
    const { data: specialitites } = await instance.get(`${DEVELOPMENT}/speciality`, fetchConfig);
    return specialitites;
};

export const fetchSpeciality = async (id) => {
    const { data: speciality } = await instance.get(`${DEVELOPMENT}/speciality/${id}`, fetchConfig);
    return speciality;
};

export const createSpecialityRequest = async (speciality) => {
    const { data: newSpeciality } = await instance.post(
        `${DEVELOPMENT}/speciality`,
        speciality,
        fetchConfig
    );
    return newSpeciality;
};

export const updateSpecialityRequest = async (speciality) => {
    const { data: updatedSpeciality } = await instance.post(
        `${DEVELOPMENT}/speciality`,
        speciality,
        fetchConfig
    );
    return updatedSpeciality;
};
