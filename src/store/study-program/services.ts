import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const fetchStudyPrograms = async () => {
    const { data: studyPrograms } = await instance.get(
        `${DEVELOPMENT}/study_programm`,
        fetchConfig
    );
    return studyPrograms;
};
