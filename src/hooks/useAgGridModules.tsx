import { useMemo } from 'react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

export const useAgGridModules = () => {
    const modules = useMemo(() => [ClientSideRowModelModule], []);

    return {
        modules,
    };
};
