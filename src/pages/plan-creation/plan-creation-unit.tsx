import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { green, red } from '@mui/material/colors';
import { IconButton, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { DeleteCell } from 'components/delete-cell';
import { PlanCreationNode } from './plan-creation-node';
import { deleteGroupUnit, updateGroupUnit } from 'store/group-unit/actions';
import { GroupUnit, Node, Plan, Semester } from 'types';
import { useDispatch } from 'react-redux';

interface PlanCreationUnitProps {
    unit: GroupUnit;
    associatedNodes: Node[];
    plans: Plan[];
    semestersWeeks?: any;
    semesters: Semester[];
}

export const PlanCreationUnit: React.FC<PlanCreationUnitProps> = ({
    unit,
    associatedNodes,
    plans,
    semestersWeeks,
    semesters,
}) => {
    const dispatch = useDispatch();
    const [unitData, setUnitData] = useState(unit);

    useEffect(() => {
        setUnitData(unit);
    }, [unit]);

    const [editMode, setEditMode] = useState(false);
    const [isCanceledState, setIsCanceledState] = useState(false);

    const unitNodes = associatedNodes?.filter((node) => node?.idSubject?.idUnit?.id === unit?.id);

    const handleChangeUnitData = (e) => {
        setUnitData({
            ...unitData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveGroupUnit = () => {
        dispatch(updateGroupUnit(unitData, unitData?.idGroupComponents?.id));
        setEditMode(false);
    };

    useEffect(() => {
        setUnitData(unit);
    }, [isCanceledState]);

    return (
        <>
            <TableRow>
                <TableCell>
                    <Stack direction="row">
                        {editMode ? (
                            <>
                                <IconButton onClick={handleSaveGroupUnit}>
                                    <DoneIcon style={{ color: green[600] }} />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        setEditMode(false);
                                        setIsCanceledState(!isCanceledState);
                                    }}
                                >
                                    <DoDisturbIcon style={{ color: red[600] }} />
                                </IconButton>
                                <TextField
                                    name="unitNumber"
                                    value={unitData?.unitNumber}
                                    onChange={handleChangeUnitData}
                                    size="small"
                                    style={{ width: 70, textAlign: 'center' }}
                                />
                            </>
                        ) : (
                            <>
                                <DeleteCell id={unit?.id} method={deleteGroupUnit} />
                                <EditIcon onClick={() => setEditMode(true)} />
                                <Typography>{unit?.unitNumber}</Typography>
                            </>
                        )}
                    </Stack>
                </TableCell>
                <TableCell style={{ backgroundColor: '#bbdefb' }}>
                    <Stack direction="row">
                        {editMode ? (
                            <TextField
                                name="name"
                                value={unitData?.name}
                                onChange={handleChangeUnitData}
                                size="small"
                                style={{ width: 240, textAlign: 'center' }}
                            />
                        ) : (
                            <Typography>{unit?.name}</Typography>
                        )}
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
};
