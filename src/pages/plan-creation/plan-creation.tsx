import React, { useEffect } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { VerticalTableCell } from 'components/vertical-cell';
import { TableCourseCell } from './plan-creation-table/table-course-cell';
import { GroupComponentName, Node, Plan, Semester, SemesterType } from 'types';
import { PlanCreationNode } from './plan-creation-node';
import { DetailsNavigationContainer } from 'components/navigation-container';
import { BackButton } from 'components/back-button';
import { useHistory } from 'react-router-dom';
import { PREFIX } from 'config/constants';
import { TableSemesterCell } from './plan-creation-table/table-semester.cell';
import { PlanCreationOverall } from './plan-cretion-overall-component';

interface PropTypes {
    plans: Plan[];
    semesters: Semester[];
    nodes: Node[];
}

const semestersWeeks = [
    { id: 1, semsteerNumber: 1, semesterWeeks: 17 },
    { id: 2, semsteerNumber: 2, semesterWeeks: 17 },
    { id: 3, semsteerNumber: 3, semesterWeeks: 17 },
    { id: 4, semsteerNumber: 4, semesterWeeks: 17 },
    { id: 5, semsteerNumber: 5, semesterWeeks: 17 },
    { id: 6, semsteerNumber: 6, semesterWeeks: 17 },
    { id: 7, semsteerNumber: 7, semesterWeeks: 17 },
    { id: 8, semsteerNumber: 8, semesterWeeks: 17 },
];

export const PlanCreation: React.FC<PropTypes> = ({ plans, semesters, nodes }) => {
    const history = useHistory();
    const govNodes = nodes.filter((node) => {
        const con =
            node?.idSubject?.idUnit?.idGroupComponents?.name === GroupComponentName.GovComponent;
        return con;
    });

    const highEduNodes = nodes.filter(
        (node) =>
            node?.idSubject?.idUnit?.idGroupComponents?.name === GroupComponentName.HighEduComponent
    );

    const optionalEduNodes = nodes.filter(
        (node) =>
            node?.idSubject?.idUnit?.idGroupComponents?.name ===
            GroupComponentName.OptionalComponent
    );

    const govSemesters = semesters?.filter(
        (semester) =>
            semester?.idNode?.idSubject?.idUnit?.idGroupComponents?.name ===
            GroupComponentName?.GovComponent
    );
    const highEduSemesters = semesters?.filter(
        (semester) =>
            semester?.idNode?.idSubject?.idUnit?.idGroupComponents?.name ===
            GroupComponentName?.HighEduComponent
    );
    const optionalEduSemesters = semesters?.filter(
        (semester) =>
            semester?.idNode?.idSubject?.idUnit?.idGroupComponents?.name ===
            GroupComponentName?.OptionalComponent
    );

    return (
        <>
            <DetailsNavigationContainer>
                <BackButton onClick={() => history.push(`/${PREFIX}/specialities`)} />
            </DetailsNavigationContainer>
            <Paper style={{ overflow: 'auto' }}>
                <TableContainer>
                    <Table>
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

                                {semestersWeeks?.map((week) => (
                                    <TableSemesterCell key={week?.id} semesterWeek={week} />
                                ))}

                                <VerticalTableCell>Всего зачетных единиц</VerticalTableCell>
                                <VerticalTableCell>Код компетенции</VerticalTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <PlanCreationOverall
                                number={1}
                                groupComponent={GroupComponentName.GovComponent}
                                semesters={govSemesters}
                            />
                            {govNodes?.map((node) => (
                                <PlanCreationNode
                                    key={node?.idNode}
                                    node={node}
                                    semesters={semesters}
                                    plans={plans}
                                    semestersWeeks={semestersWeeks}
                                />
                            ))}
                            <PlanCreationOverall
                                number={2}
                                groupComponent={GroupComponentName.HighEduComponent}
                                semesters={highEduSemesters}
                            />
                            {highEduNodes?.map((node) => (
                                <PlanCreationNode
                                    key={node?.idNode}
                                    node={node}
                                    semesters={semesters}
                                    plans={plans}
                                    semestersWeeks={semestersWeeks}
                                />
                            ))}
                            <PlanCreationOverall
                                number={3}
                                groupComponent={GroupComponentName.OptionalComponent}
                                semesters={optionalEduSemesters}
                            />
                            {optionalEduNodes?.map((node) => (
                                <PlanCreationNode
                                    key={node?.idNode}
                                    node={node}
                                    semesters={semesters}
                                    plans={plans}
                                    semestersWeeks={semestersWeeks}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};
