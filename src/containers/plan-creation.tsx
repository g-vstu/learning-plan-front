import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialities } from 'store/speciality/actions';
import { selectSpecialities } from 'store/speciality/selectors';

export const PlanCreationContanier: React.FC = () => {
    const dispatch = useDispatch();
    const specialities = useSelector(selectSpecialities);

    useEffect(() => {
        dispatch(getSpecialities());
        debugger;
    }, [dispatch]);

    useEffect(() => {
        console.log(specialities);
        debugger;
    }, [specialities]);

    return <div>Plan creation container</div>;
};
