import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchGroupUnits = async () => {
    const { data: groupUnits } = await instance.get(`${DEVELOPMENT}/group_units`);
    return groupUnits;
};

export const createGroupUnitRequest = async (groupUnit, groupComponentId) => {
    const { data: newGroupUnit } = await instance.post(
        `${DEVELOPMENT}/group_units?groupComponentsId=${groupComponentId}`,
        groupUnit
    );
    return newGroupUnit;
};

export const deleteGroupUnitRequest = async (id) => {
    await instance.delete(`${DEVELOPMENT}/group_units/${id}`);
};
