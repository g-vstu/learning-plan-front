import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { match } from 'react-router-dom';
import { getGlobalPlan } from 'store/plan/actions';
import { selectCurrentPlan, selectPlans, selectPlansLoading } from 'store/plan/selectors';
import { selectNodes, selectNodesLoading } from 'store/node/selectors';
import { selectPractices, selectPracticesLoading } from 'store/practice/selectors';
import {
    selectSemesters,
    selectSemestersLoading,
    selectWeeksSemesters,
    selectWeeksSemestersLoading,
} from 'store/semester/selectors';
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
import { getPractices } from 'store/practice/actions';
import { getWeeksSemesters } from 'store/semester/actions';

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
    const isPracticesLoading = useSelector(selectPracticesLoading);
    const isWeeksSemestersLoading = useSelector(selectWeeksSemestersLoading);

    useEffect(() => {
        if (
            !isPlansLoading &&
            !isNodesLoading &&
            !isSemestersLoading &&
            !isSubjectsLoading &&
            !isGroupComponentsLoading &&
            !isGroupUnitsLoading &&
            !isSubCompetenciesLoading &&
            !isPracticesLoading
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
        isSubCompetenciesLoading,
        isPracticesLoading,
    ]);

    useEffect(() => {
        dispatch(getGlobalPlan(+match?.params?.id));
        dispatch(getGroupUnits());
        dispatch(getGroupComponents());
        dispatch(getSubjects());
        dispatch(getSubCompetencies());
        dispatch(getPractices());
        dispatch(getWeeksSemesters());
    }, [dispatch, match?.params?.id]);

    const nodes = useSelector(selectNodes);
    const plans = useSelector(selectPlans);
    const semesters = useSelector(selectSemesters);
    const practices = useSelector(selectPractices);
    const weeks = useSelector(selectWeeksSemesters);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <PlanCreation
                    plans={plans}
                    nodes={nodes}
                    semesters={semesters}
                    practices={practices}
                    weeks={weeks}
                />
            )}
        </>
    );
};
