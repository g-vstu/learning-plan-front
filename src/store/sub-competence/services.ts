import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const fetchSubCompetencies = async () => {
    const { data: subCompetencies } = await instance.get(
        `${DEVELOPMENT}/sub_competence`,
        fetchConfig
    );
    return subCompetencies;
};

export const createSubCimpetenceRequest = async (competenceId, subjectId) => {
    const { data: newSubCompetency } = await instance.post(
        `${DEVELOPMENT}/sub_competence?competenceId=${competenceId}&subjectId=${subjectId}`,
        {},
        fetchConfig
    );
    return newSubCompetency;
};
