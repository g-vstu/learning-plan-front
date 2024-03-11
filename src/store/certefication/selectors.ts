import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Certefication } from 'types';

const getCertefications = (state: ApplicationState): Certefication[] =>
    state.certefication.certefications;
export const selectCertefications = createSelector(
    [getCertefications],
    (certefications) => certefications
);
