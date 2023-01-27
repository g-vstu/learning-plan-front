import { useEffect, useState } from 'react';
import { Semester, SemesterType, SemesterWeek } from 'types';

export const useSemestersTotalCalculate = (
    semesters: Semester[],
    semestersWeeks: SemesterWeek[]
) => {
    const [semestersTotal, setSemestersTotal] = useState([]);

    const newSemestersTotal = semestersWeeks.map((semesterWeek) => {
        return {
            rgr: semesters.reduce((sum, semesterData) => {
                if (semesterWeek.numberSemestr == semesterData.number)
                    return sum + semesterData.rgr;
            }, 0),
            exams: semesters.reduce((sum, semesterData) => {
                if (
                    (semesterWeek.numberSemestr == semesterData.number &&
                        semesterData.type == SemesterType.Exam) ||
                    semesterData.type == SemesterType.DifTest
                )
                    return sum + 1;
            }, 0),
        };
    });
    /*setSemestersTotal( // Replace the state
    [ // with a new array
      ...artists, // that contains all the old items
      { id: nextId++, name: name } // and one new item at the end
    ]
  );
  */

    useEffect(() => {
        setSemestersTotal(newSemestersTotal);
    }, [newSemestersTotal]);

    return {
        semestersTotal,
    };
};
