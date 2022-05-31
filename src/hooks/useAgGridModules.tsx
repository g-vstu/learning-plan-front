import { useMemo } from 'react';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

export const useAgGridModules = () => {
    const modules = useMemo(() => [ClientSideRowModelModule, SetFilterModule], []);

    return {
        modules,
    };
};
