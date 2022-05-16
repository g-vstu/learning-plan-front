import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchSemesters = async () => {
    const { data: subjects } = await instance.get(`${DEVELOPMENT}/semestr`);
    return subjects;
};
