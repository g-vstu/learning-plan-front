import { DEVELOPMENT, fetchConfig } from 'config/constants';
import instance from 'store/auth/instance';

export const fetchGroupComponents = async () => {
    const { data: groupComponents } = await instance.get(
        `${DEVELOPMENT}/group_components`,
        fetchConfig
    );
    return groupComponents;
};
