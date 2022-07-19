import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from 'react';
import { Context } from '../../components/contexts/AuthContext';

function AdminRoute(){

    const { isAdmin } = useContext(Context)

    var admin = localStorage.getItem('admin');
    console.log(isAdmin);

    return isAdmin ? <Outlet/> : <Navigate to='/'/>;
}

export default AdminRoute;