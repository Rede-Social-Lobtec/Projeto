import React, {createContext, useState, useEffect} from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const Context = createContext();

function AuthProvider({children}){

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");

        if(token){
            api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(email, password){

        var body = {email:'', senha:''};
        body.email = email;
        body.senha = password;
        const {data: token} = await api.post('/auth', body);
        localStorage.setItem('token', JSON.stringify(token));
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        navigate('/feed', {replace:true});
        setAuthenticated(true);
        console.log(token);
        
    }

    async function loginToken(token){
        var {email} = jwt_decode(token);
        var body = { email: email }
        const {data: retorno} = await api.post('/authGoogle', body);
        localStorage.setItem('token', JSON.stringify(retorno.token));
        localStorage.setItem('id', JSON.stringify(retorno.id));
        api.defaults.headers.common["Authorization"] = `Bearer ${retorno.token}`;
        navigate('/feed', {replace:true});
        setAuthenticated(true);
        
    }

    async function handleLogout(){
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        api.defaults.headers.common["Authorization"] = undefined;
        navigate('/', {replace: true});
    }

    if(loading){
        return <h2>Loading...</h2>;
    }


    return(
        <Context.Provider value={{authenticated, handleLogin, loginToken, handleLogout, loading}}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider}