import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';
import { Semester, WeeksSemester } from 'types';

export const updateWeeksSemesterRequest = async (weeksSemester: WeeksSemester) => {
    const { data: updatedWeeksSemester } = await instance.post(
        `${DEVELOPMENT}/weeks_semestr?planId=${weeksSemester?.idPlan?.id}`,
        weeksSemester
    );
    return updatedWeeksSemester;
};

export const createWeeksSemesterRequest = async (weeksSemester: WeeksSemester) => {
    const { data: newSemester } = await instance.post(
        `${DEVELOPMENT}/weeks_semestr?planId=${weeksSemester?.idPlan?.id}`,
        weeksSemester
    );

    return newSemester;
};

export const fetchWeeksSemesters = async () => {
    const { data: weeksSemesters } = await instance.get(`${DEVELOPMENT}/weeks_semestr`);
    return weeksSemesters;
};

export const createWeeksSemesters = async (week: WeeksSemester, currentPlan) => {
    const { data: newSemester } = await instance.post(
        `${DEVELOPMENT}/weeks_semestr?planId=${currentPlan?.id}`,
        week
    );
    return newSemester;
};

export const fetchSemesters = async () => {
    const { data: semesters } = await instance.get(`${DEVELOPMENT}/semestr`);
    return semesters;
};

export const updateSemesterRequest = async (semester: Semester) => {
    const { data: updatedSemester } = await instance.post(
        `${DEVELOPMENT}/semestr?nodeId=${semester?.idNode?.id}`,
        semester
    );
    return updatedSemester;
};

export const createSemesterRequest = async (semester: Semester, node) => {
    //HERE (was node?.id)
    const { data: newSemester } = await instance.post(
        `${DEVELOPMENT}/semestr?nodeId=${node?.id}`,
        semester
    );

    return newSemester;
};

export const deleteSemesterRequest = async (semesterId) => {
    await instance.delete(`${DEVELOPMENT}/semestr/${semesterId}`);
};
