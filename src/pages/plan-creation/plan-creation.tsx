import React, { useEffect } from 'react';
import {
    Container,
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
import { GroupComponentName, Node, Plan, Semester } from 'types';
import { PlanCreationNode } from './plan-creation-node';
import { DetailsNavigationContainer } from 'components/navigation-container';
import { BackButton } from 'components/back-button';
import { useHistory } from 'react-router-dom';
import { PREFIX } from 'config/constants';
import { TableSemesterCell } from './plan-creation-table/table-semester.cell';

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
                                <TableCell style={{ width: 250, border: '1px solid red' }}>
                                    Название модуля, учебной дисциплины, курсового проекта(курсовой
                                    работы)
                                </TableCell>
                                <VerticalTableCell>Экзамены</VerticalTableCell>
                                <VerticalTableCell>Зачеты</VerticalTableCell>
                                <VerticalTableCell>Расчетно графические работы</VerticalTableCell>
                                <VerticalTableCell>Всего</VerticalTableCell>
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
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>{GroupComponentName.GovComponent}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1.1</TableCell>
                                <TableCell>Модуль Социально гуманитарные дисциплины</TableCell>
                            </TableRow>
                            {govNodes?.map((node) => (
                                <PlanCreationNode
                                    key={node?.idNode}
                                    node={node}
                                    semesters={semesters}
                                    plans={plans}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};
