import { Reducer } from 'redux';
import { CerteficationState } from 'types/certefication';
import { GET_CERTEFICATIONS } from './types';

const initialState: CerteficationState = {
    certefications: [],
    currentCertefication: null,
    loading: true,
    error: null,
};

const certeficationReducer: Reducer<CerteficationState> = (
    state: CerteficationState = initialState,
    action
) => {
    switch (action.type) {
        case GET_CERTEFICATIONS.start:
            return onGetCerteficationsStart(state);
        case GET_CERTEFICATIONS.success:
            return onGetCerteficationsSuccess(state, action.payload);
        case GET_CERTEFICATIONS.failure:
            return onGetCerteficationsFailure(state, action.payload);

        default:
            return state;
    }
};

const onGetCerteficationsStart = (state: CerteficationState): CerteficationState => ({
    ...state,
    loading: true,
});

const onGetCerteficationsSuccess = (state: CerteficationState, payload): CerteficationState => {
    return {
        ...state,
        certefications: payload.certefications,
        loading: false,
    };
};

const onGetCerteficationsFailure = (state: CerteficationState, payload): CerteficationState => ({
    ...state,
    loading: false,
    error: payload.error,
});

export default certeficationReducer;
