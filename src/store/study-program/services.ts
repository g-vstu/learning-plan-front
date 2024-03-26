import { DEVELOPMENT, fetchConfig } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchStudyPrograms = async () => {
    const { data: studyPrograms } = await instance.get(
        `${DEVELOPMENT}/study_programm`,
        fetchConfig
    );
    return studyPrograms;
};
