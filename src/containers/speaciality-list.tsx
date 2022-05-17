import { Typography } from '@mui/material';
import { Loader } from 'components/loader';
import { Specialities } from 'pages/speciality/speciality-overview/specialities';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialities } from 'store/speciality/actions';
import { selectSpecialities } from 'store/speciality/selectors';

export const SpecialitiesListContainer: React.FC = () => {
    const dispatch = useDispatch();
    const specialities = useSelector(selectSpecialities);

    useEffect(() => {
        dispatch(getSpecialities());
    }, [dispatch]);

    return <>{specialities.length ? <Specialities specialities={specialities} /> : <Loader />}</>;
};
