import { ApplicationState } from 'store';
import { createSelector } from 'reselect';
import { Plan } from 'types';

const getPlans = (state: ApplicationState): Plan[] => state.plan.plans;
export const selectPlans = createSelector([getPlans], (plans) => plans);

const getPlansLoading = (state: ApplicationState): boolean => state.plan.loading;
export const selectPlansLoading = createSelector([getPlansLoading], (loading) => loading);
