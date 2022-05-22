import React, { useEffect } from 'react';
import { Loader } from 'components/loader';
import { GroupUnits } from 'pages/group-unit/group-units';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupUnits } from 'store/group-unit/actions';
import { selectGroupUnits, selectGroupUnitsLoading } from 'store/group-unit/selectors';
import { getGroupComponents } from 'store/group-component/actions';
import { selectGroupComponentsLoading } from 'store/group-component/selectors';

export const GroupUnitsList: React.FC = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectGroupUnitsLoading);
    const groupUnits = useSelector(selectGroupUnits);

    const isComponentsLoading = useSelector(selectGroupComponentsLoading);

    useEffect(() => {
        dispatch(getGroupUnits());
        dispatch(getGroupComponents());
    }, [dispatch]);

    return (
        <>
            {isLoading || isComponentsLoading ? <Loader /> : <GroupUnits groupUnits={groupUnits} />}
        </>
    );
};
