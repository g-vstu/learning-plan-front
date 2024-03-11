import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { StudyProgram } from 'types/study-program';

const getStudyPrograms = (state: ApplicationState): StudyProgram[] =>
    state.studyProgram.studyPrograms;
export const selectStudyPrograms = createSelector(
    [getStudyPrograms],
    (studyPrograms) => studyPrograms
);
