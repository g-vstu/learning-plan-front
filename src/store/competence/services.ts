import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchCompetencies = async () => {
    const { data: competencies } = await instance.get(`${DEVELOPMENT}/competence`);
    return competencies;
};
