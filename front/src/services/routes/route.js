import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { TokenContext } from '../../components/contexts/token';

export default function PrivateRoute (){
    const {signed} = useContext(TokenContext);

    if(!signed){
        return signed ? <Outlet /> : <Navigate to="/" />; 
    }else{
        <Navigate to='feed'/>
    }
    
}

