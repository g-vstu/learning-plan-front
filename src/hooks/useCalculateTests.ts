import { useEffect, useState } from 'react';
import { Semester, SemesterType } from 'types';

export const useCalculateTotalTests = (semesters: Semester[]) => {
    const [totalWorks, setTotalWorks] = useState({
        totalExams: 0,
        totalTests: 0,
        totalRgrs: 0,
    });
    const exams = semesters.filter((semester) => semester.type === SemesterType.Exam).length;
    const tests = semesters.filter((semester) => semester.type === SemesterType.Test).length;
    const rgrs = semesters.reduce((sum, semester) => sum + semester.rgr, 0);

    useEffect(() => {
        setTotalWorks({
            ...totalWorks,
            totalExams: exams,
            totalTests: tests,
            totalRgrs: rgrs,
        });
    }, [exams, tests, rgrs]);

    return {
        totalExams: totalWorks.totalExams,
        totalTests: totalWorks.totalTests,
        totalRgrs: totalWorks.totalRgrs,
    };
};
