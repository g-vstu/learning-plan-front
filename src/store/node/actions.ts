import { ThunkAction } from 'redux-thunk';
import { Action, Dispatch } from 'redux';
import { RootState } from 'store';
import { CREATE_NODE_WITH_SUBJECT, CREATE_NODE, GET_NODES } from './types';
import { Node, Subject } from 'types';
import { createNodeRequest, fetchNodes } from './services';
import { addSubjectRequest } from 'store/subject/services';
import { ADD_SUBJECT } from 'store/subject/types';

export const getNodes = (): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_NODES.start });
        try {
            const nodes: Node[] = await fetchNodes();
            dispatch({
                type: GET_NODES.success,
                payload: { nodes },
            });
        } catch (error) {
            dispatch({
                type: GET_NODES.failure,
                payload: { error },
            });
        }
    };
};

export const createNode = (
    node: { idCathedra: number; nodeNumber: string },
    subjectId,
    plan
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_NODE.start });
        try {
            const newNode: Node = await createNodeRequest(node, subjectId, plan);
            dispatch({
                type: CREATE_NODE.success,
                payload: { newNode },
            });
        } catch (error) {
            dispatch({
                type: CREATE_NODE.failure,
                payload: { error },
            });
        }
    };
};

export const createNodeWithNewSubject = (
    node: { idCathedra: number; nodeNumber: string },
    plan,
    subject,
    groupUnitId
): ThunkAction<Promise<void>, RootState, null, Action> => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_NODE_WITH_SUBJECT.start });
        try {
            const newSubject: Subject = await addSubjectRequest(subject, groupUnitId);
            const newNode: Node = await createNodeRequest(node, newSubject?.id, plan);
            dispatch({
                type: ADD_SUBJECT.success,
                payload: { subject: newSubject },
            });
            dispatch({
                type: CREATE_NODE.success,
                payload: { newNode },
            });
        } catch (error) {
            dispatch({
                type: CREATE_NODE.failure,
                payload: { error },
            });
        }
    };
};
