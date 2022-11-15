import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { green, red } from '@mui/material/colors';
import { IconButton, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { DeleteCell } from 'components/delete-cell';
import { PlanCreationNode } from './plan-creation-node';
import { deleteGroupUnit, updateGroupUnit } from 'store/group-unit/actions';
import { GroupUnit, Node, Plan, Semester } from 'types';
import { useDispatch } from 'react-redux';
import { useEditMode } from 'hooks/useEditMode';
import WarnDialog from '../../components/warn-dialog';

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

    const {
        editMode,
        setEditMode,
        entityData: unitData,
        handleChangeEntityData: handleChangeUnitData,
        handleCancelClick,
    } = useEditMode(unit);

    const [WarnOpen, setWarnOpen] = useState(false);
    const unitNodes = associatedNodes?.filter((node) => node?.idSubject?.idUnit?.id === unit?.id);

    const handleSaveGroupUnit = () => {
        dispatch(updateGroupUnit(unitData, unitData?.idGroupComponents?.id));
        setEditMode(false);
    };

    const handleDeleteGroupUnit = () => {
        if (unitNodes.length !== 0) setWarnOpen(true);
        else dispatch(deleteGroupUnit(unit.id));
    };
    return (
        <>
            <WarnDialog title="Невозможно выполнить!" open={WarnOpen} setOpen={setWarnOpen}>
                Вначале удалите все предметы из модуля!
            </WarnDialog>
            <TableRow>
                <TableCell>
                    <Stack direction="row">
                        {editMode ? (
                            <>
                                <IconButton onClick={handleSaveGroupUnit}>
                                    <DoneIcon style={{ color: green[600] }} />
                                </IconButton>
                                <IconButton onClick={handleCancelClick}>
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
                                <DeleteIcon
                                    onClick={handleDeleteGroupUnit}
                                    style={{ color: red[600] }}
                                />
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
                    key={node?.id}
                    node={node}
                    semesters={semesters}
                    plans={plans}
                    semestersWeeks={semestersWeeks}
                />
            ))}
        </>
    );
};
