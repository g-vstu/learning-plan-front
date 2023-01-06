import { useEffect, useState } from 'react';
import { Semester, SemesterType } from 'types';

export const useCalculateTotalTests = (semesters: Semester[]) => {
    const [totalWorks, setTotalWorks] = useState({
        totalExams: 0,
        totalTests: 0,
        totalRgrs: 0,
        totalZe: 0,
        totalProsm: 0,
    });
    const exams = semesters.filter((semester) => semester.type === SemesterType.Exam).length;
    const prosm = semesters.filter((semester) => semester.type === SemesterType.Prosm).length;
    const tests = semesters.filter(
        (semester) => semester.type === SemesterType.Test || semester.type === SemesterType.DifTest
    ).length;
    const rgrs = semesters.reduce((sum, semester) => sum + semester.rgr, 0);
    const allZe = semesters.reduce((sum, semester) => sum + semester?.ze, 0);

    useEffect(() => {
        setTotalWorks({
            ...totalWorks,
            totalExams: exams,
            totalTests: tests,
            totalRgrs: rgrs,
            totalZe: allZe,
            totalProsm: prosm,
        });
    }, [exams, tests, rgrs, allZe, prosm]);

    return {
        totalExams: totalWorks.totalExams,
        totalTests: totalWorks.totalTests,
        totalRgrs: totalWorks.totalRgrs,
        totalZe: totalWorks.totalZe,
        totalProsm: totalWorks.totalProsm,
    };
};
