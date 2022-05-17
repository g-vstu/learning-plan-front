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
import { GroupComponentName, Node, Plan, Semester } from 'types';
import { PlanCreationNode } from './plan-creation-node';

interface PropTypes {
    plans: Plan[];
    semesters: Semester[];
    nodes: Node[];
}

const semestersWeeks = [
    { id: 1, course: '1 курс', startSem: 1, endSem: 2, firstNum: 17, secondNum: 18 },
    { id: 2, course: '2 курс', startSem: 3, endSem: 4, firstNum: 17, secondNum: 18 },
    { id: 3, course: '3 курс', startSem: 5, endSem: 6, firstNum: 17, secondNum: 18 },
    { id: 4, course: '4 курс', startSem: 7, endSem: 8, firstNum: 17, secondNum: 18 },
];

export const PlanCreation: React.FC<PropTypes> = ({ plans, semesters, nodes }) => {
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
                            <TableCell padding="none">
                                <TableRow>
                                    <TableCell padding="none" colSpan={6}>
                                        Количество академических часов
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <VerticalTableCell>Всего</VerticalTableCell>
                                    <VerticalTableCell>Аудиторные</VerticalTableCell>
                                    <VerticalTableCell>Лекции</VerticalTableCell>
                                    <VerticalTableCell>Лабораторные</VerticalTableCell>
                                    <VerticalTableCell>Практические</VerticalTableCell>
                                    <VerticalTableCell>Семинарские</VerticalTableCell>
                                </TableRow>
                            </TableCell>
                            <TableCell>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        paddingTop: 0,
                                        marginTop: 0,
                                    }}
                                >
                                    Распределение по курсам и семестрам
                                </div>

                                <TableRow>
                                    <TableCell padding="none">
                                        <TableRow>
                                            {semestersWeeks?.map((week) => (
                                                <TableCourseCell key={week.id} week={week} />
                                            ))}
                                        </TableRow>
                                    </TableCell>
                                </TableRow>
                            </TableCell>
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
    );
};
