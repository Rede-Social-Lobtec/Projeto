import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from 'react';
import { Context } from '../../components/contexts/AuthContext';

function AdminRoute(){

    const { isAdmin } = useContext(Context)

    console.log(isAdmin);

    return isAdmin ? <Outlet/> : <Navigate to='/feed'/>;
}

export default AdminRoute;