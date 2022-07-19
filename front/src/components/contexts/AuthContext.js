import React, {createContext, useState, useEffect} from 'react';
import api from '../../services/api';
import { useNavigate, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';


const Context = createContext();

function AuthProvider({children}){

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const admin = localStorage.getItem("admin");
        if(token){
            api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
            if(admin == 'true'){
                setIsAdmin(true);
            }        
        }
        setLoading(false);

    }, []);

    async function handleLogin(email, password){

        var body = {email:'', senha:''};
        body.email = email;
        body.senha = password;
        const {data: data} = await api.post('/auth', body);
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('id', JSON.stringify(data.id));
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate('/feed', {replace:true});
        // setAuthenticated(true);
        // setIsAdmin(true);
        

        async function getAdmin() {
            await api.get(`user/${data.id}`)
                .then((res) => {
                    var {admin} = (res.data);
                    if(admin){
                        localStorage.setItem('admin', admin);
                    }else{
                        localStorage.setItem('admin', false);
                    }
                })
        }
        getAdmin();
        console.log(isAdmin);
    }

    async function loginToken(token){

        var {email} = jwt_decode(token);
        var body = { email: email }
        const {data: data} = await api.post('/authGoogle', body);
        localStorage.setItem('token', JSON.stringify(data.token));
        localStorage.setItem('id', JSON.stringify(data.id));
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate('/feed', {replace:true});
        setAuthenticated(true);

        async function getAdmin() {
            await api.get(`user/${data.id}`)
                .then((res) => {
                    var {admin} = (res.data);
                    if(admin){
                        localStorage.setItem('admin', admin);
                    }else{
                        localStorage.setItem('admin', false);
                    }
                })
        }
        getAdmin();
        
    }

    async function handleLogout(){
        setAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('admin');
        api.defaults.headers.common["Authorization"] = undefined;
        navigate('/', {replace: true});
    }

    

    if(loading){
        return <h2>Loading...</h2>;
    }


    return(
        <Context.Provider value={{authenticated, isAdmin, handleLogin, loginToken, handleLogout, loading}}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider}