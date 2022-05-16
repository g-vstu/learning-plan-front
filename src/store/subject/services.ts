import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchSubjects = async () => {
    const { data: subjects } = await instance.get(`${DEVELOPMENT}/subject`);
    return subjects;
};
