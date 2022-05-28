import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroupUnits } from 'store/group-unit/selectors';
import { GroupComponentName, Node, Plan, Semester, Subject } from 'types';
import { PlanCreationNode } from './plan-creation-node';
import { PlanCreationOverall } from './plan-cretion-overall-component';

interface PropTypes {
    associatedSemesters: Semester[];
    associatedNodes: Node[];
    semestersWeeks?: any;
    associatedSubjects: Subject[];
    semesters: Semester[];
    plans: Plan[];
    groupComponent: GroupComponentName;
}

export const PlanCreationMain: React.FC<PropTypes> = ({
    associatedNodes,
    associatedSemesters,
    semestersWeeks,
    associatedSubjects,
    semesters,
    plans,
    groupComponent,
}) => {
    const groupUnits = useSelector(selectGroupUnits);
    const associateUnits = groupUnits?.filter(
        (unit) => unit?.idGroupComponents?.name === groupComponent
    );
    return (
        <>
            <PlanCreationOverall groupComponent={groupComponent} semesters={associatedSemesters} />
            {associateUnits?.map((unit) => {
                const unitNodes = associatedNodes?.filter(
                    (node) => node?.idSubject?.idUnit?.id === unit?.id
                );
                return (
                    <>
                        <TableRow>
                            <TableCell>{unit?.unitNumber}</TableCell>
                            <TableCell style={{ backgroundColor: '#bbdefb' }}>
                                {unit?.name}
                            </TableCell>
                        </TableRow>
                        {unitNodes?.map((node) => (
                            <PlanCreationNode
                                key={node?.idNode}
                                node={node}
                                semesters={semesters}
                                plans={plans}
                                semestersWeeks={semestersWeeks}
                            />
                        ))}
                    </>
                );
            })}
        </>
    );
};
