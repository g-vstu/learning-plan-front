import { Typography } from '@mui/material';
import { Loader } from 'components/loader';
import { Plans } from 'pages/plan/plans';
import { Specialities } from 'pages/speciality/speciality-overview/specialities';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from 'store/plan/actions';
import { selectPlans, selectPlansLoading } from 'store/plan/selectors';
import { getSpecialities } from 'store/speciality/actions';
import { selectSpecialities, selectSpecialitiesLoading } from 'store/speciality/selectors';

export const PlansList: React.FC = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectPlansLoading);
    const plans = useSelector(selectPlans);

    useEffect(() => {
        dispatch(getPlans());
    }, [dispatch]);

    return <>{isLoading ? <Loader /> : <Plans plans={plans} />}</>;
};
