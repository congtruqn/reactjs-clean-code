import { Navigate } from 'react-router-dom';

import { history } from './history';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
export { PrivateRoute };

function PrivateRoute({ children }) {
    const count = useSelector((state: RootState) => state.auth.access);
    if (!count) {
        return <Navigate to="/signin" state={{ from: history.location }} />
    }
    return children;
}