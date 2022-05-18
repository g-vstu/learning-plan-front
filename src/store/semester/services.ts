import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';
import { Node, Semester } from 'types';

export const fetchSemesters = async () => {
    const { data: semesters } = await instance.get(`${DEVELOPMENT}/semestr`);
    return semesters;
};

export const fetchWeeksSemesters = async () => {
    const { data: weeksSemesters } = await instance.get(`${DEVELOPMENT}/weeks_semestr`);
    return weeksSemesters;
};

export const updateSemesterRequest = async (semester: Semester) => {
    const { data: updatedSemester } = await instance.post(
        `${DEVELOPMENT}/semestr?nodeId=${semester?.idNode?.idNode}`,
        semester
    );

    return updatedSemester;
};

export const createSemesterRequest = async (semester: Semester, node) => {
    const { data: newSemester } = await instance.post(
        `${DEVELOPMENT}/semestr?nodeId=${node?.idNode}`,
        semester
    );

    return newSemester;
};
