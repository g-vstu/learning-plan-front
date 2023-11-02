import { useEffect, useState } from 'react';
import { Semester } from 'types';

export const useCalculateTotalParams = (semesters: Semester[]) => {
    const [totalCourseHours, setTotalCourseHours] = useState({
        totalClass: 0,
        totalAuditore: 0,
        totalLecture: 0,
        totalLab: 0,
        totalPractice: 0,
        totalSeminar: 0,
    });

    const seminars = semesters.reduce((sum, semester) => sum + semester.seminar, 0);
    const lectures = semesters.reduce((sum, semester) => sum + semester.lecture, 0);
    const selfeducations = semesters.reduce((sum, semester) => sum + semester.selfeducation, 0);
    const laboratories = semesters.reduce((sum, semester) => sum + semester.laboratory, 0);
    const practices = semesters.reduce((sum, semester) => sum + semester.practice, 0);
    const course = semesters.reduce((sum, semester) => sum + semester.courceWorkHours, 0);

    useEffect(() => {
        setTotalCourseHours({
            ...totalCourseHours,
            totalSeminar: seminars,
            totalLecture: lectures,
            totalPractice: practices,
            totalLab: laboratories,
            totalAuditore: lectures + laboratories + seminars + practices,
            totalClass: lectures + laboratories + seminars + practices + selfeducations + course,
        });
    }, [seminars, lectures, selfeducations, practices, laboratories]);

    return {
        totalClass: totalCourseHours.totalClass,
        totalAuditore: totalCourseHours.totalAuditore,
        totalPractice: totalCourseHours.totalPractice,
        totalLecture: totalCourseHours.totalLecture,
        totalLab: totalCourseHours.totalLab,
        totalSeminar: totalCourseHours.totalSeminar,
    };
};
