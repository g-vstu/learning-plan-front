export enum GroupComponentName {
    GovComponent = 'Государственный компонент',
    HighEduComponent = 'Компонент учреждения высшего образования',
    OptionalComponent = 'Факультативные дисциплины',
    additionalComponent = 'Дополнительные виды обучения',
}

export interface GroupComponent {
    id: number;
    componentNumber: number;
    name: GroupComponentName;
}

export interface GroupComponentState {
    groupComponents: GroupComponent[];
    currentGroupComponent: GroupComponent;
    loading: boolean;
    error: any;
}
