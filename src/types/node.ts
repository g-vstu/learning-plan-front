import { Plan } from './plan';
import { Subject } from './subject';

export interface Node {
    idNode: number;
    idCathedra: number;
    nodeNumber: string;
    idPlan: Plan;
    idSubject: Subject;
}

export interface NodeState {
    nodes: Node[];
    currentNode: Node;
    loading: boolean;
    error: any;
}
