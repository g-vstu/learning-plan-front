import React, { useState } from 'react';
import { Button, Container, Dialog, DialogContent } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CourseWorkType, Node, Semester, SemesterType } from 'types';
import { blue, green, purple } from '@mui/material/colors';
import { FieldContainer } from 'components/field-container';
import { createSemester } from 'store/semester/actions';

interface PropTypes {
    open: boolean;
    setOpen: (param: boolean) => void;
    node: Node;
    currentSemesterNumber: number;
}

export const AddSemesterDialog: React.FC<PropTypes> = ({
    open,
    setOpen,
    node,
    currentSemesterNumber,
}) => {
    const dispatch = useDispatch();

    const handleCreateSubjectSemester = () => {
        const newSemester: Semester = {
            courceWorkHours: 0,
            courceWorkZe: 0,
            courseWorkType: null,
            laboratory: 0,
            lecture: 0,
            number: currentSemesterNumber,
            practice: 0,
            rgr: 0,
            selfeducation: 0,
            seminar: 0,
            type: SemesterType.Test,
            ze: 0,
        };
        dispatch(createSemester(newSemester, node));
        setOpen(false);
    };

    const handleCreateWorkSemester = () => {
        const newSemester: Semester = {
            courceWorkHours: 0,
            courceWorkZe: 0,
            courseWorkType: CourseWorkType.Project,
            laboratory: 0,
            lecture: 0,
            number: currentSemesterNumber,
            practice: 0,
            rgr: 0,
            selfeducation: 0,
            seminar: 0,
            type: SemesterType.Test,
            ze: 0,
        };
        dispatch(createSemester(newSemester, node));
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
                <DialogContent>
                    <Container style={{ marginTop: 0, paddingTop: 20, paddingBottom: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button
                                variant="contained"
                                onClick={handleCreateSubjectSemester}
                                fullWidth
                                style={{ marginRight: 20, backgroundColor: green[500] }}
                            >
                                Дисциплина
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleCreateWorkSemester}
                                fullWidth
                                style={{ backgroundColor: purple[400] }}
                            >
                                Курсовая работа/проект
                            </Button>
                        </div>
                    </Container>
                </DialogContent>
            </Dialog>
        </>
    );
};
