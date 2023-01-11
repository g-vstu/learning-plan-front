import React, { useState } from 'react';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { VerticalTableCell } from 'components/vertical-cell';
import { GroupComponentName, Node, Plan, Practice, Semester, WeeksSemester } from 'types';
import { DetailsNavigationContainer } from 'components/navigation-container';
import { BackButton } from 'components/back-button';
import { useHistory } from 'react-router-dom';
import { PREFIX } from 'config/constants';
import { TableSemesterCell } from './plan-creation-table/table-semester.cell';
import { makeStyles } from '@mui/styles';
import { PlanCreationMain } from './plan-creation-main';
import { AddPlanDialog } from './plan-creation-add-subject/add-plan-subject';
import { AddGroupUnitDialog } from 'pages/group-unit/add-group-unit-dialog';
import { useGetAssociatedNodes } from 'hooks/useGetAssociatedNodes';
import { useGetAssociatedSemesters } from 'hooks/useGetAssociatedSemesters';
import { useSelector } from 'react-redux';
import { selectCurrentPlan } from 'store/plan/selectors';
import { PracticeTable } from './practice-table/practice-table';
import { OverviewHeader } from 'components/overview-header';
import { OverviewTitle } from 'components/overview-title';
import { CurrencyBitcoin } from '@mui/icons-material';

interface PropTypes {
    plans: Plan[];
    semesters: Semester[];
    nodes: Node[];
    practices: Practice[];
    weeks: WeeksSemester[];
}

const useStyles = makeStyles({
    table: {
        borderRadius: 5,
        fontSize: 12,
        fontWeight: 'normal',
        border: 'none',
        borderCollapse: 'collapse',
        width: '100%',
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        backgroundColor: 'white',
    },
    header: {
        textAlign: 'center',
        padding: 8,
    },
});


export const PlanCreation: React.FC<PropTypes> = ({
    plans,
    semesters,
    nodes,
    practices,
    weeks,
}) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [openUnitDialog, setOpenUnitDialog] = useState(false);

    const { govNodes, highEduNodes, optionalEduNodes, additionalNodes } =
        useGetAssociatedNodes(nodes);

    const { govSemesters, highEduSemesters, optionalEduSemesters, additionalSemesters } =
        useGetAssociatedSemesters(semesters);

    const currentPlan = useSelector(selectCurrentPlan);

    const associatePractices = practices?.filter(
        (practice) => practice?.idPlan.id == currentPlan?.id
    );

    const associateWeeks = weeks?.filter((week) => week?.idPlan.id == currentPlan?.id);

    // получить ассоциированные с планом практики
    return (
        <>
            <AddGroupUnitDialog open={openUnitDialog} setOpen={setOpenUnitDialog} />
            <AddPlanDialog open={open} setOpen={setOpen} nodes={nodes} />
            <OverviewHeader>
                <div style={{ display: 'flex' }}>
                    <OverviewTitle>
                        {currentPlan.idSpeciality.name} <br /> {currentPlan.learnYear}
                    </OverviewTitle>
                </div>
            </OverviewHeader>
            <DetailsNavigationContainer>
                <BackButton onClick={() => history.push(`/${PREFIX}/plans`)} />
                <div>
                    <Button
                        variant="contained"
                        style={{ marginRight: 10 }}
                        onClick={() => setOpenUnitDialog(true)}
                    >
                        Добавить модуль
                    </Button>
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        Добавить предмет
                    </Button>
                </div>
            </DetailsNavigationContainer>
            <Paper style={{ overflow: 'auto' }}>
                <TableContainer
                    style={{
                        boxShadow: '0px 35px 50px rgba( 0, 0, 0, 0.2 )',
                    }}
                >
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>№ п/п</TableCell>
                                <TableCell style={{ width: 250 }}>
                                    Название модуля, учебной дисциплины, курсового проекта(курсовой
                                    работы)
                                </TableCell>
                                <VerticalTableCell>Экзамены</VerticalTableCell>
                                <VerticalTableCell>Зачеты</VerticalTableCell>
                                <VerticalTableCell>Расчетно графические работы</VerticalTableCell>
                                <VerticalTableCell>Итого</VerticalTableCell>
                                <VerticalTableCell>Аудиторные</VerticalTableCell>
                                <VerticalTableCell>Лекции</VerticalTableCell>
                                <VerticalTableCell>Лабораторные</VerticalTableCell>
                                <VerticalTableCell>Практические</VerticalTableCell>
                                <VerticalTableCell>Семинарские</VerticalTableCell>

                                {associateWeeks?.map((week) => (
                                    <TableSemesterCell key={week?.id} semesterWeek={week} />
                                ))}

                                <VerticalTableCell>Всего зачетных единиц</VerticalTableCell>
                                <VerticalTableCell>Код компетенции</VerticalTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <PlanCreationMain
                                associatedNodes={govNodes}
                                associatedSemesters={govSemesters}
                                semesters={semesters}
                                plans={plans}
                                semestersWeeks={associateWeeks}
                                groupComponent={GroupComponentName.GovComponent}
                            />
                            <PlanCreationMain
                                associatedNodes={highEduNodes}
                                associatedSemesters={highEduSemesters}
                                semesters={semesters}
                                plans={plans}
                                semestersWeeks={associateWeeks}
                                groupComponent={GroupComponentName.HighEduComponent}
                            />
                            <PlanCreationMain
                                associatedNodes={optionalEduNodes}
                                associatedSemesters={optionalEduSemesters}
                                semesters={semesters}
                                plans={plans}
                                semestersWeeks={associateWeeks}
                                groupComponent={GroupComponentName.OptionalComponent}
                            />
                            <PlanCreationMain
                                associatedNodes={additionalNodes}
                                associatedSemesters={additionalSemesters}
                                semesters={semesters}
                                plans={plans}
                                semestersWeeks={associateWeeks}
                                groupComponent={GroupComponentName.AdditionalComponent}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
                <PracticeTable practices={associatePractices} currentPlan={currentPlan} />
            </Paper>
        </>
    );
};
