import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const fetchCompetencies = async () => {
    const { data: competencies } = await instance.get(`${DEVELOPMENT}/competence`, fetchConfig);
    return competencies;
};

export const createCompetenceRequest = async (competence) => {
    const { data: newCompetence } = await instance.post(
        `${DEVELOPMENT}/competence`,
        competence,
        fetchConfig
    );
    return newCompetence;
};
