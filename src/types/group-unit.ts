import { GroupComponent } from './group-component';

export interface GroupUnit {
    id: number;
    name: string;
    unitNumber: string;
    idGroupComponents: GroupComponent;
}

export interface GroupUnitState {
    groupUnits: GroupUnit[];
    currentGroupUnit: GroupUnit;
    loading: boolean;
    error: any;
}
