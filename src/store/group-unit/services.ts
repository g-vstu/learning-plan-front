import { DEVELOPMENT, fetchConfig } from 'config/constants';
import instance from 'store/auth/instance';

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
    const { data: groupUnits } = await instance.get(
        `${DEVELOPMENT}/group_units/planId/${planId}`,
        fetchConfig
    );
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
