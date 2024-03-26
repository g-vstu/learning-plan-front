import { DEVELOPMENT, fetchConfig } from 'config/constants';
import instance from 'store/auth/instance';

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
