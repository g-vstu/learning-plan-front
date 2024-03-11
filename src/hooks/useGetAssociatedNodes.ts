import { GroupComponentName, Node } from 'types';

interface ReturnValue<T> {
    govNodes: T;
    highEduNodes: T;
    optionalEduNodes: T;
    additionalNodes: T;
}

export const useGetAssociatedNodes = <T extends Node>(nodes: T[]): ReturnValue<Node[]> => {
    const govNodes = nodes?.filter(
        (node) =>
            node?.idSubject?.idUnit?.idGroupComponents?.name === GroupComponentName.GovComponent
    );
    const highEduNodes = nodes?.filter(
        (node) =>
            node?.idSubject?.idUnit?.idGroupComponents?.name === GroupComponentName.HighEduComponent
    );
    const optionalEduNodes = nodes?.filter(
        (node) =>
            node?.idSubject?.idUnit?.idGroupComponents?.name ===
            GroupComponentName.OptionalComponent
    );
    const additionalNodes = nodes?.filter(
        (node) =>
            node?.idSubject?.idUnit?.idGroupComponents?.name ===
            GroupComponentName.AdditionalComponent
    );

    return {
        govNodes,
        highEduNodes,
        optionalEduNodes,
        additionalNodes,
    };
};
