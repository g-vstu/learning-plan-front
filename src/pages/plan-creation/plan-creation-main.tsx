import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGroupUnits } from 'store/group-unit/selectors';
import { selectCurrentPlan } from 'store/plan/selectors';
import { GroupComponentName, Node, Plan, Semester } from 'types';
import { PlanCreationOverall } from './plan-cretion-overall-component';
import { PlanCreationUnit } from './plan-creation-unit';

interface PropTypes {
    associatedSemesters: Semester[];
    associatedNodes: Node[];
    semestersWeeks?: any;
    semesters: Semester[];
    plans: Plan[];
    groupComponent: GroupComponentName;
}

export const PlanCreationMain: React.FC<PropTypes> = ({
    associatedNodes,
    associatedSemesters,
    semestersWeeks,
    semesters,
    plans,
    groupComponent,
}) => {
    const groupUnits = useSelector(selectGroupUnits);
    const currentPlan = useSelector(selectCurrentPlan);

    const associateUnits = groupUnits?.filter(
        (unit) =>
            unit?.idGroupComponents?.name === groupComponent && unit?.idPlana === currentPlan?.id
    );
    return (
        <>
            <PlanCreationOverall groupComponent={groupComponent} semesters={associatedSemesters} />
            {associateUnits?.map((unit) => (
                <PlanCreationUnit
                    key={unit?.id}
                    unit={unit}
                    associatedNodes={associatedNodes}
                    plans={plans}
                    semestersWeeks={semestersWeeks}
                    semesters={semesters}
                />
            ))}
        </>
    );
};
