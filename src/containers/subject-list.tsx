import { useSelect } from '@mui/base';
import { Typography } from '@mui/material';
import { Loader } from 'components/loader';
import { Specialities } from 'pages/speciality/speciality-overview/specialities';
import { Subjects } from 'pages/subject/subject-overview/subjects';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupUnits } from 'store/group-unit/actions';
import { selectGroupUnits, selectGroupUnitsLoading } from 'store/group-unit/selectors';
import { getSpecialities } from 'store/speciality/actions';
import { selectSpecialities, selectSpecialitiesLoading } from 'store/speciality/selectors';
import { getSubjects } from 'store/subject/actions';
import { selectSubjects, selectSubjectsLoading } from 'store/subject/selectors';

export const SubjectList: React.FC = () => {
    const dispatch = useDispatch();
    const isSubjectsLoading = useSelector(selectSubjectsLoading);
    const subjects = useSelector(selectSubjects);

    const groupUnits = useSelector(selectGroupUnits);
    const isGroupUnitsLoading = useSelector(selectGroupUnitsLoading);

    useEffect(() => {
        dispatch(getSubjects());
        //dispatch(getGroupUnits());
    }, [dispatch]);

    return (
        <>
            {isSubjectsLoading || isGroupUnitsLoading ? (
                <Loader />
            ) : (
                <Subjects subjects={subjects} groupUnits={groupUnits} />
            )}
        </>
    );
};
