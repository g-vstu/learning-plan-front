import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchSemesters = async () => {
    const { data: semesters } = await instance.get(`${DEVELOPMENT}/semestr`);
    return semesters;
};

export const fetchWeeksSemesters = async () => {
    const { data: weeksSemesters } = await instance.get(`${DEVELOPMENT}/weeks_semestr`);
    return weeksSemesters;
};
