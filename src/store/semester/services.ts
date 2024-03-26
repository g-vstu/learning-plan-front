import { DEVELOPMENT, fetchConfig } from 'config/constants';
import instance from 'store/auth/instance';
import { Semester, WeeksSemester } from 'types';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const updateWeeksSemesterRequest = async (weeksSemester: WeeksSemester) => {
    const { data: updatedWeeksSemester } = await instance.post(
        `${DEVELOPMENT}/weeks_semestr?planId=${weeksSemester?.idPlan?.id}`,
        weeksSemester,
        fetchConfig
    );
    return updatedWeeksSemester;
};

export const createWeeksSemesterRequest = async (weeksSemester: WeeksSemester) => {
    const { data: newSemester } = await instance.post(
        `${DEVELOPMENT}/weeks_semestr?planId=${weeksSemester?.idPlan?.id}`,
        weeksSemester,
        fetchConfig
    );

    return newSemester;
};

export const fetchWeeksSemesters = async () => {
    const { data: weeksSemesters } = await instance.get(
        `${DEVELOPMENT}/weeks_semestr`,
        fetchConfig
    );
    return weeksSemesters;
};

export const fetchPlanWeeksSemesters = async (idPlan: number) => {
    const { data: weeksSemesters } = await instance.get(
        `${DEVELOPMENT}/weeks_semestr/planId/${idPlan}`,
        fetchConfig
    );
    return weeksSemesters;
};

export const createWeeksSemesters = async (week: WeeksSemester, currentPlan) => {
    const { data: newSemester } = await instance.post(
        `${DEVELOPMENT}/weeks_semestr?planId=${currentPlan?.id}`,
        week,
        fetchConfig
    );
    return newSemester;
};

export const fetchSemesters = async () => {
    const { data: semesters } = await instance.get(`${DEVELOPMENT}/semestr`, fetchConfig);
    return semesters;
};

export const fetchPlanSemesters = async (idPlan: number) => {
    const { data: semesters } = await instance.get(
        `${DEVELOPMENT}/semestr/plan/${idPlan}`,
        fetchConfig
    );
    return semesters;
};

export const updateSemesterRequest = async (semester: Semester) => {
    const { data: updatedSemester } = await instance.post(
        `${DEVELOPMENT}/semestr?nodeId=${semester?.idNode?.id}`,
        semester,
        fetchConfig
    );
    return updatedSemester;
};

export const createSemesterRequest = async (semester: Semester, node) => {
    //HERE (was node?.id)
    const { data: newSemester } = await instance.post(
        `${DEVELOPMENT}/semestr?nodeId=${node?.id}`,
        semester,
        fetchConfig
    );

    return newSemester;
};

export const deleteSemesterRequest = async (semesterId) => {
    await instance.delete(`${DEVELOPMENT}/semestr/${semesterId}`, fetchConfig);
};
