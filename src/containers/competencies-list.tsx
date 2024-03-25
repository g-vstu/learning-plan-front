import React, { useEffect } from 'react';
import { Loader } from 'components/loader';
import { useDispatch, useSelector } from 'react-redux';
import { getSubCompetencies } from 'store/sub-competence/actions';
import {
    selectSubCompetenciesLoading,
    selectSubCompetencies,
} from '../store/sub-competence/selectors';
import { Competencies } from 'pages/competence/competencies';
import { getCompetencies } from 'store/competence/actions';
import { selectCompetenciesLoading } from 'store/competence/selectors';
import { getSpecialities } from 'store/speciality/actions';
import { selectSpecialitiesLoading } from 'store/speciality/selectors';
import { getSubjects } from 'store/subject/actions';
import { selectSubjectsLoading } from 'store/subject/selectors';
import RequireAuth from '../hoc/RequireAuth';

export const CompetenciesList: React.FC = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectSubCompetenciesLoading);
    const subCompetencies = useSelector(selectSubCompetencies);

    const isCompetenciesLoading = useSelector(selectCompetenciesLoading);
    const selectedSpeciality = useSelector(selectSubjectsLoading);

    useEffect(() => {
        dispatch(getSubCompetencies());
        dispatch(getCompetencies());
        dispatch(getSubjects());
    }, [dispatch]);

    return (
        <>
            {isLoading || isCompetenciesLoading || selectedSpeciality ? (
                <Loader />
            ) : (
                <RequireAuth role={['DEAN']}>
                    <Competencies subCompetencies={subCompetencies} />
                </RequireAuth>
            )}
        </>
    );
};
