import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Plan } from 'types';

const getPlans = (state: ApplicationState): Plan[] => state.plan.plans;
export const selectPlans = createSelector([getPlans], (plans) => plans);
