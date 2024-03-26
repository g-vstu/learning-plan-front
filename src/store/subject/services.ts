import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const fetchSubjects = async () => {
    const { data: subjects } = await instance.get(`${DEVELOPMENT}/subject`, fetchConfig);
    return subjects;
};

export const addSubjectRequest = async (subject, groupUnitId) => {
    const { data: newSubject } = await instance.post(
        `${DEVELOPMENT}/subject?unitId=${groupUnitId}`,
        subject,
        fetchConfig
    );
    return newSubject;
};

export const deleteSubjectRequest = async (id) => {
    await instance.delete(`${DEVELOPMENT}/subject/${id}`, fetchConfig);
};
export const updateSubjectRequest = async (subject, unitId) => {
    const { data: updatedSubject } = await instance.post(
        `${DEVELOPMENT}/subject?unitId=${unitId}`,
        subject,
        fetchConfig
    );
    return updatedSubject;
};
