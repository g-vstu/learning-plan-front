export interface Speciality {
    id: number;
    name: string;
    shifr: string;
}

export interface SpecialityState {
    specialities: Speciality[];
    currentSpeciality: Speciality;
    loading: boolean;
    error: any;
}
