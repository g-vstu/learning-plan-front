import React, { useEffect } from 'react';
import { Loader } from 'components/loader';
import { Plans } from 'pages/plan/plans';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from 'store/plan/actions';
import { selectPlans, selectPlansLoading } from 'store/plan/selectors';
import { getSpecialities } from 'store/speciality/actions';
import { selectSpecialitiesLoading } from 'store/speciality/selectors';

export const PlansList: React.FC = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectPlansLoading);
    const isSpecialities = useSelector(selectSpecialitiesLoading);
    const plans = useSelector(selectPlans);

    useEffect(() => {
        dispatch(getPlans());
        dispatch(getSpecialities());
    }, [dispatch]);

    return <>{isLoading || isSpecialities ? <Loader /> : <Plans plans={plans} />}</>;
};
