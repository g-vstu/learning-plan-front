import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const fetchGroupUnits = async () => {
    const { data: groupUnits } = await instance.get(`${DEVELOPMENT}/group_units`, fetchConfig);
    return groupUnits;
};

export const createGroupUnitRequest = async (groupUnit, groupComponentId) => {
    const { data: newGroupUnit } = await instance.post(
        `${DEVELOPMENT}/group_units?groupComponentsId=${groupComponentId}`,
        groupUnit,
        fetchConfig
    );
    return newGroupUnit;
};

export const fetchPlanGroupUnits = async (planId) => {
    const { data: groupUnits } = await instance.get(`${DEVELOPMENT}/group_units/planId/${planId}`);
    return groupUnits;
};

export const deleteGroupUnitRequest = async (id) => {
    await instance.delete(`${DEVELOPMENT}/group_units/${id}`, fetchConfig);
};

export const updateGroupUnitsRequest = async (groupUnit, groupComponentId) => {
    const { data: newGroupUnit } = await instance.post(
        `${DEVELOPMENT}/group_units?groupComponentsId=${groupComponentId}`,
        groupUnit,
        fetchConfig
    );
    return newGroupUnit;
};
