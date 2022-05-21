import { MenuItem, Select, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { GroupComponentName } from 'types';
import { PlanCreationNode } from './plan-creation-node';
import { PlanCreationOverall } from './plan-cretion-overall-component';

export const PlanCreationMain: React.FC<any> = ({
    associatedNodes,
    associatedSemesters,
    semestersWeeks,
    associatedSubjects,
    semesters,
    plans,
    groupComponent,
}) => {
    return (
        <>
            <PlanCreationOverall
                number={1}
                groupComponent={groupComponent}
                semesters={associatedSemesters}
            />
            {associatedNodes?.map((node) => (
                <PlanCreationNode
                    key={node?.idNode}
                    node={node}
                    semesters={semesters}
                    plans={plans}
                    semestersWeeks={semestersWeeks}
                />
            ))}
            <TableRow>
                <TableCell></TableCell>
                <TableCell>
                    <Select
                        fullWidth
                        size="small"
                        //value={}
                        //onChange={handleChangeType}
                    >
                        {associatedSubjects?.map((subject) => (
                            <MenuItem key={subject?.id} value={subject?.id}>
                                {subject?.name}
                            </MenuItem>
                        ))}
                    </Select>
                </TableCell>
            </TableRow>
        </>
    );
};
