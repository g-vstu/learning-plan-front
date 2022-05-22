import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecialities } from 'store/speciality/actions';
import { selectSpecialities } from 'store/speciality/selectors';
import { match } from 'react-router-dom';
import { getGlobalPlan } from 'store/plan/actions';
import { selectPlans, selectPlansLoading } from 'store/plan/selectors';
import { selectNodes, selectNodesLoading } from 'store/node/selectors';
import { selectSemesters, selectSemestersLoading } from 'store/semester/selectors';
import { Loader } from 'components/loader';
import { PlanCreation } from 'pages/plan-creation/plan-creation';
import { getSubjects } from 'store/subject/actions';
import { selectSubjectsLoading } from 'store/subject/selectors';
import { getGroupUnits } from 'store/group-unit/actions';
import { getGroupComponents } from 'store/group-component/actions';
import { selectGroupComponentsLoading } from 'store/group-component/selectors';
import { selectGroupUnitsLoading } from 'store/group-unit/selectors';
import { getSubCompetencies } from 'store/sub-competence/actions';
import { selectSubCompetenciesLoading } from 'store/sub-competence/selectors';

export const PlanCreationContanier: React.FC<{ match: match<any> }> = ({ match }) => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const isPlansLoading = useSelector(selectPlansLoading);
    const isNodesLoading = useSelector(selectNodesLoading);
    const isSemestersLoading = useSelector(selectSemestersLoading);
    const isSubjectsLoading = useSelector(selectSubjectsLoading);

    const isGroupComponentsLoading = useSelector(selectGroupComponentsLoading);
    const isGroupUnitsLoading = useSelector(selectGroupUnitsLoading);
    const isSubCompetenciesLoading = useSelector(selectSubCompetenciesLoading);

    useEffect(() => {
        if (
            !isPlansLoading &&
            !isNodesLoading &&
            !isSemestersLoading &&
            !isSubjectsLoading &&
            !isGroupComponentsLoading &&
            !isGroupUnitsLoading
        ) {
            setIsLoading(false);
        }
    }, [
        isPlansLoading,
        isNodesLoading,
        isSemestersLoading,
        isSubjectsLoading,
        isGroupComponentsLoading,
        isGroupUnitsLoading,
    ]);

    const nodes = useSelector(selectNodes);
    const plans = useSelector(selectPlans);
    const semesters = useSelector(selectSemesters);

    useEffect(() => {
        dispatch(getGlobalPlan(+match?.params?.id));
        dispatch(getGroupUnits());
        dispatch(getGroupComponents());
        dispatch(getSubjects());
        dispatch(getSubCompetencies());
    }, [dispatch, match?.params?.id]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <PlanCreation plans={plans} nodes={nodes} semesters={semesters} />
            )}
        </>
    );
};
