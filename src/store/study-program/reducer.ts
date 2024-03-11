import { Reducer } from 'redux';
import { StudyProgramState } from 'types/study-program';
import { GET_STUDY_PROGRAMS } from './types';

const initialState: StudyProgramState = {
    studyPrograms: [],
    currentStudyProgram: null,
    loading: true,
    error: null,
};

const studyProgramReducer: Reducer<StudyProgramState> = (
    state: StudyProgramState = initialState,
    action
) => {
    switch (action.type) {
        case GET_STUDY_PROGRAMS.start:
            return onGetStudyProgramsStart(state);
        case GET_STUDY_PROGRAMS.success:
            return onGetStudyProgramsSuccess(state, action.payload);
        case GET_STUDY_PROGRAMS.failure:
            return onGetStudyProgramsFailure(state, action.payload);

        default:
            return state;
    }
};

const onGetStudyProgramsStart = (state: StudyProgramState): StudyProgramState => ({
    ...state,
    loading: true,
});

const onGetStudyProgramsSuccess = (state: StudyProgramState, payload): StudyProgramState => {
    return {
        ...state,
        studyPrograms: payload.studyPrograms,
        loading: false,
    };
};

const onGetStudyProgramsFailure = (state: StudyProgramState, payload): StudyProgramState => ({
    ...state,
    loading: false,
    error: payload.error,
});

export default studyProgramReducer;
