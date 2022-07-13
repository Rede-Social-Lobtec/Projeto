import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from 'react';
import { Context } from '../../components/contexts/AuthContext';

function PrivateRoute(){

    const { authenticated } = useContext(Context);

    return authenticated==true ? <Outlet/> : <Navigate to='/'/>;
}

export default PrivateRoute;