import { DEVELOPMENT } from 'config/constants';
import instance from 'store/auth/instance';

const token = JSON.parse(localStorage.getItem('user')).access_token;
const fetchConfig = {
    headers: {
        Authorization: `Bearer ${token ? token : ''}`,
    },
};

export const fetchGroupComponents = async () => {
    const { data: groupComponents } = await instance.get(
        `${DEVELOPMENT}/group_components`,
        fetchConfig
    );
    return groupComponents;
};
