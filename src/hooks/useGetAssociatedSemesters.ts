import { GroupComponentName, Semester } from 'types';

interface ReturnValue {
    govSemesters: Semester[];
    highEduSemesters: Semester[];
    optionalEduSemesters: Semester[];
    additionalSemesters: Semester[];
}

export const useGetAssociatedSemesters = (semesters: Semester[]): ReturnValue => {
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
    const additionalSemesters = semesters?.filter(
        (semester) =>
            semester?.idNode?.idSubject?.idUnit?.idGroupComponents?.name ===
            GroupComponentName.AdditionalComponent
    );

    return {
        govSemesters,
        highEduSemesters,
        optionalEduSemesters,
        additionalSemesters,
    };
};
