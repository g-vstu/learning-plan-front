export default (action: string) => ({
    start: `${action}_START`,
    success: `${action}_SUCCESS`,
    failure: `${action}_FAILURE`,
});

export interface AsyncActionSet {
    start: string;
    success: string;
    failure: string;
}
