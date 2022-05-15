import { DEVELOPMENT } from 'config/constants';

export const fetchSpecialities = async () => {
    const response = await fetch(`${DEVELOPMENT}/speciality`);
    const specialitites = await response.json();
    return specialitites;
};
