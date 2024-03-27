import { withRouter, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { PREFIX } from 'config/constants';
export default withRouter(function RequireAuth({ children, role, history }) {
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            history.push(`/${PREFIX}`, { state: { from: location }, replace: true });
        }
    }, [user, history, location]);

    if (!user) {
        return null;
    }

    return children;
});
