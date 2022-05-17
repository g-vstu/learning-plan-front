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

export const PlanCreationContanier: React.FC<{ match: match<any> }> = ({ match }) => {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(true);

    const isPlansLoading = useSelector(selectPlansLoading);
    const isNodesLoading = useSelector(selectNodesLoading);
    const isSemestersLoading = useSelector(selectSemestersLoading);

    useEffect(() => {
        if (isPlansLoading && isNodesLoading && isSemestersLoading) {
            setIsLoading(false);
        }
    }, [isPlansLoading, isNodesLoading, isSemestersLoading]);

    const nodes = useSelector(selectNodes);
    const plans = useSelector(selectPlans);
    const semesters = useSelector(selectSemesters);

    useEffect(() => {
        //dispatch(getSpecialities());
        dispatch(getGlobalPlan(+match?.params?.id));
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
