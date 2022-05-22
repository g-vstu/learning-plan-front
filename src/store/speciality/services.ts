import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchSpecialities = async () => {
    const { data: specialitites } = await instance.get(`${DEVELOPMENT}/speciality`);
    return specialitites;
};

export const fetchSpeciality = async (id) => {
    const { data: speciality } = await instance.get(`${DEVELOPMENT}/speciality/${id}`);
    return speciality;
};

export const createSpecialityRequest = async (speciality) => {
    const { data: newSpeciality } = await instance.post(`${DEVELOPMENT}/speciality`, speciality);
    return newSpeciality;
};
