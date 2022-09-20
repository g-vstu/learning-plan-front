import { Stack, TableCell, TableRow, Typography } from '@mui/material';
import { DeleteCell } from 'components/delete-cell';
import React from 'react';
import { useSelector } from 'react-redux';
import { deleteGroupUnit } from 'store/group-unit/actions';
import { selectGroupUnits } from 'store/group-unit/selectors';
import { selectCurrentPlan } from 'store/plan/selectors';
import { GroupComponentName, Node, Plan, Semester } from 'types';
import { PlanCreationNode } from './plan-creation-node';
import { PlanCreationOverall } from './plan-cretion-overall-component';

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
            {associateUnits?.map((unit) => {
                const unitNodes = associatedNodes?.filter(
                    (node) => node?.idSubject?.idUnit?.id === unit?.id
                );
                return (
                    <>
                        <TableRow>
                            <TableCell>{unit?.unitNumber}</TableCell>
                            <TableCell style={{ backgroundColor: '#bbdefb' }}>
                                <Stack direction="row">
                                    <DeleteCell id={unit?.id} method={deleteGroupUnit} />
                                    <Typography>{unit?.name}</Typography>
                                </Stack>
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
